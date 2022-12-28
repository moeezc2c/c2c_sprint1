const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const Joi = require('joi');

const Contract = require("../../../models/ProposalAndContract/Contract");
const Email = require("../../../middleware/sendEmail");
const StartContractTemplate = require("../../../templates/ContractStart");
const User = require("../../../models/User");
const Freelancer = require("../../../models/Freelancer/Freelancer");

const JoiMilestoneSchema = Joi.object({
	milestone_name: Joi.string().required(),
	milestone_description: Joi.string().required(),
	milestone_start: Joi.date().required(),
	milestone_end: Joi.date().required(),
	milestone_status: Joi.string().valid('Not Started', 'In Progress', 'Completed').required(),
	milestone_percentage: Joi.number().required(),
	milestone_amount: Joi.number().required(),
})

const JoiFixedContractSchema = Joi.object({
	fixed_price: Joi.number().required(),
	deposit_type: Joi.string().valid('Milestone', 'Complete').required(),
	milestone: Joi.alternatives().conditional('deposit_type', {is : 'Milestone', then: Joi.array().items(JoiMilestoneSchema).required() , otherwise: Joi.array().optional()}),
	due_date: Joi.date().required(),
}).required();

const JoiHourlyContractSchema = Joi.object({
	hourly_rates: Joi.number().required(),
	weekly_limits: Joi.boolean().required(),
	weekly_limit_rates: Joi.alternatives().conditional('weekly_limits', {is:true, then: Joi.number().required(), otherwise: Joi.number().optional()}),
}).required();

const JoiContractSchema = Joi.object({
	proposal_id: Joi.string().required(),
	freelancer_id: Joi.string().required(),
	contract_type: Joi.string().valid('Fixed', 'Hourly').required(),
	fixed_contract: Joi.alternatives().conditional('contract_type', {is: 'Fixed', then: JoiFixedContractSchema, otherwise: Joi.optional()}),
	hourly_contract: Joi.alternatives().conditional('contract_type', {is: 'Hourly', then: JoiHourlyContractSchema, otherwise: Joi.optional()}),
	payment_type_id: Joi.string().required(),
	hire_manager_id: Joi.string().required(),
	job_id: Joi.string().required(),
	contract_status: Joi.string().valid('Pending').required(),
})



// @route   GET api/contract
// @desc    Get contract lookup list
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		if (!user) {
			return res.status(400).json({ msg: 'User not found' });
		}
		if(user.type === 'Freelancer'){
			const freelancer = await Freelancer.findOne({user_id: user._id});
            console.log("🚀 ~ file: Contract.js ~ line 60 ~ router.get ~ freelancer", freelancer)
			if(!freelancer){
				return res.status(400).json({ msg: 'Freelancer not found' });
			}
			const contract = await Contract.find({freelancer_id: freelancer._id});
			res.json({data:contract,msg: "Data Extracted Successfully"});
		}
		if(user.type === 'Client'){
			const contract = await Contract.find({hire_manager_id: user._id})
			res.json({data:contract,msg: "Data Extracted Successfully"});
		}
		if(user.type === 'Admin'){
			const contract = await Contract.find();
			res.json({data:contract,msg: "Data Extracted Successfully"})
		}
		
	} catch (err) {
        console.log("🚀 ~ file: Contract.js ~ line 76 ~ router.get ~ err", err)
		res.status(500).send('Server Error');
	}
});

// @route   POST api/contract/verify/:id
// @desc    Verify contract
// @access  Private

router.post('/verify', auth, async (req, res) => {
	try {
		const freelancer = await Freelancer.findOne({ user_id: req.user.id});

		if (!freelancer) {
			return res.status(400).json({ msg: 'Freelancer not found' });
		}
		const contract = await Contract.findById(req.body.contract_id);
		if (!contract) {
			return res.status(400).json({ msg: 'Contract not found' });
		}
		if(contract.freelancer_id.toString() !== freelancer._id.toString()){
			return res.status(400).json({ msg: 'unAuthorized Request' });
		}
		if(contract.contract_status !== 'Pending'){
			return res.status(400).json({ msg: 'Contract already verified' });
		}
		contract.contract_status = req.body.status;
		await contract.save();
		res.json({msg: "Contract Verified Successfully"});
	} catch (err) {
		console.log("🚀 ~ file: Contract.js ~ line 136 ~ router.post ~ err", err)
		res.status(500).send('Server Error');
	}
});

// @route   POST api/contract
// @desc    Add contract
// @access  Private
router.post('/',
	[
		auth
	],
	async (req, res) => {
		
		try {
			const value = await JoiContractSchema.validateAsync(req.body);
			// create
			if(!value.error){
				const contractList = await Contract.findOne({job_id: req.body.job_id, hire_manager_id: req.body.hire_manager_id});
				if(contractList){
					return res.status(400).json({ msg: 'Proposal already exists. Delete previous Proposal' });
				}
				let contract = new Contract(req.body);
				await contract.save().then(t => t.populate('hire_manager_id').populate('freelancer_id').populate('job_id').execPopulate())
                await Email.sendEmail(contract.freelancer_id.user_id.email,StartContractTemplate(contract.hire_manager_id.user_name,contract.job_id.headline));
				return res.json({data: contract,msg: 'Contract added successfully'});
			}
		} catch (err) {
			res.send(400,{ msg: err?.details[0]?.message || err });
        }

    });

	router.post('/freelancerResponse',
	[
		auth
	],
	async (req, res) => {
		
		try {
			const {id, response} = req.body;
			const contract = await Contract.findById(id);
			if(contract){
				await contract.findByIdAndUpdate(id, {$set: {contract_status: response}});
			}else{
				return res.status(400).json({
					msg: 'Contract not found'
				});
			}
		} catch (err) {
			
			res.send(500,{ msg: err.details[0].message });
        }

    });

// @route   GET api/contract/:id
// @desc    Get contract by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {

		const contract = await Contract.findOne({ _id: req.params.id });

		if (!contract) {
			res.status(400).json({ msg: 'There is no contract for this id' });
		}

		res.json(contract);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   DELETE api/contract/:id
// @desc    Delete contract
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		if (!user) {
			return res.status(400).json({ msg: 'User not found' });
		}
		
		const contract = await Contract.findById(req.params.id);
		if (!contract) {
			return res.status(400).json({ msg: 'Contract not found' });
		}
		if(user.type === 'Client'){
			if(contract.hire_manager_id.toString() !== user._id.toString()){
				return res.status(400).json({ msg: 'unAuthorized Request' });
			}

			await Contract.findByIdAndDelete(req.params.id);
			res.json({msg: "Contract Deleted Successfully"});

		}else{
			return res.status(400).json({ msg: 'unAuthorized Request' });
		}

		
	} catch (err) {
		

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Contract not found' });
		}

		res.status(500).status('Server Error');
	}
});

module.exports = router;
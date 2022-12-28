const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");


const Proposal = require("../../../models/ProposalAndContract/Proposal");
const User = require('../../../models/User');
const Freelancer = require('../../../models/Freelancer/Freelancer');

// @route   GET api/proposal
// @desc    Get proposal lookup list
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const proposal = await Proposal.find();

		if (!proposal) {
			res.status(400).json({ msg: 'There is no proposal' });
		}

		res.json(proposal);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/proposal
// @desc    Add proposal
// @access  Private
router.post('/',
	[
		auth
	],
	async (req, res) => {

		const {
			job_id,
			freelancer_id,
			hire_manager_id,
			payment_type_id,
			payment_amount,
			current_proposal_status,
			client_grade,
			client_comment,
			attachments,
			user_name,
			freelancer_grade,
			freelancer_comment
		} = req.body;
		try {
			// Build proposal object
			const proposalFields = {};
			if (job_id) proposalFields.job_id = job_id;
			if (freelancer_id) proposalFields.freelancer_id = freelancer_id;
			if (hire_manager_id) proposalFields.hire_manager_id = hire_manager_id;
			if (payment_type_id) proposalFields.payment_type_id = payment_type_id;
			if (payment_amount) proposalFields.payment_amount = payment_amount;
			if (attachments) proposalFields.attachments = attachments;
			if (current_proposal_status) proposalFields.current_proposal_status = current_proposal_status;
			if (client_grade) proposalFields.client_grade = client_grade;
			if (client_comment) proposalFields.client_comment = client_comment;
			if (user_name) proposalFields.user_name = user_name;
			if (freelancer_grade) proposalFields.freelancer_grade = freelancer_grade;
			if (freelancer_comment) proposalFields.freelancer_comment = freelancer_comment;

			// create
			let proposal = new Proposal(proposalFields);

			await proposal.save();

			return res.json(proposal);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

// @route   GET api/proposal/:id
// @desc    Get proposal by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {

		const proposal = await Proposal.findOne({ _id: req.params.id });

		if (!proposal) {
			res.status(400).json({ msg: 'There is no proposal for this id' });
		}

		res.json(proposal);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   GET api/proposal/:id
// @desc    check proposal by id
// @access  Private
router.post('/check/:id', auth, async (req, res) => {
	try {

		var proposal = await Proposal.findOne({ job_id: req.params.id });

		if (proposal) {

			proposal = await Proposal.findOne({ freelancer_id: req.body.freelancer_id, hire_manager_id: req.body.hire_manager_id });

			if (proposal) {
				res.json({ proposalSubmitted: true });
			} else {
				res.json({ proposalSubmitted: false });
			}

		} else {
			res.json({ proposalSubmitted: false });
		}

		// res.json(proposal);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});

// @route   GET api/proposal/:id
// @desc    check proposal by id
// @access  Private
router.get('/getproposalbyclient/:id/:userType', auth, async (req, res) => {
	try {
		var freelancerMessagesid = [];
		var finalData = [];
		var usersWithProposals;
		if (req.params.userType == 'Freelancer') {
			let freelancer = await Freelancer.findOne({ user_id: req.params.id });
			if(!freelancer){
				return res.status(400).json({ msg: 'There is no freelancer for this id' });
			}
			var proposal = await Proposal.find({ freelancer_id: freelancer._id });
			proposal.map((d, k) => {
				freelancerMessagesid.push(d.hire_manager_id);
			})
			usersWithProposals = await User.find({ _id: { $in: freelancerMessagesid } });
			proposal.map(proposalD => {
				let user= usersWithProposals.find((item)=>item._id.toString()===proposalD.hire_manager_id.toString());
					finalData.push({
						proposal_id: proposalD._id,
						username: user.user_name,
						job_id: proposalD.job_id,
						freelancer_id: proposalD.freelancer_id,
						hire_manager_id: proposalD.hire_manager_id,
						payment_type_id: proposalD.payment_type_id,
						payment_amount: proposalD.payment_amount,
						current_proposal_status: proposalD.current_proposal_status,
						client_grade: proposalD.client_grade,
						client_comment: proposalD.client_comment,
						freelancer_grade: proposalD.freelancer_grade,
						freelancer_comment: proposalD.freelancer_comment,
						proposal_time: proposalD.proposal_time
					})
			})
		} 
		else {
			var proposal = await Proposal.find({ hire_manager_id: req.params.id }).populate('freelancer_id');
			// proposal.map((d, k) => {
			// 	freelancerMessagesid.push(d.freelancer_id);
			// })
			// usersWithProposals = await Freelancer.find({ _id: { $in: freelancerMessagesid } }).lean();
			// let obj = [...usersWithProposals]
			proposal.map(proposalD => {
				finalData.push({
						proposal_id: proposalD._id,
						username: proposalD?.freelancer_id?.user_id?.user_name,
						job_id: proposalD.job_id,
						freelancer_id: proposalD.freelancer_id,
						hire_manager_id: proposalD.hire_manager_id,
						payment_type_id: proposalD.payment_type_id,
						payment_amount: proposalD.payment_amount,
						current_proposal_status: proposalD.current_proposal_status,
						client_grade: proposalD.client_grade,
						client_comment: proposalD.client_comment,
						freelancer_grade: proposalD.freelancer_grade,
						freelancer_comment: proposalD.freelancer_comment,
						proposal_time: proposalD.proposal_time
					})
				}
			)
	
		}

		res.json(finalData);

	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   DELETE api/proposal/:id
// @desc    Delete proposal
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {

		let proposal = await Proposal.findOne({ _id: req.params.id });

		if (proposal.freelancer_id.toString() !== req.user.id) {
			return res.status(400).json({ msg: 'You cannot delete someone else proposal' });
		}

		// Remove proposal
		await Proposal.findOneAndRemove({ _id: req.params.id });

		res.json({ msg: 'Proposal deleted' });
	} catch (err) {
		

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Proposal not found' });
		}

		res.status(500).status('Server Error');
	}
});

module.exports = router;
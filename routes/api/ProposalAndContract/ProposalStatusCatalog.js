const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");


const ProposalStatusCatalog = require("../../../models/ProposalAndContract/ProposalStatusCatalog");

// @route   GET api/proposalstatuscatalog
// @desc    Get proposalstatuscatalog lookup list
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const proposalstatuscatalog = await ProposalStatusCatalog.find();

		
		if (!proposalstatuscatalog) {
			res.status(400).json({ msg: 'There is no proposalstatuscatalog' });
		}
		res.json(proposalstatuscatalog);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/proposalstatuscatalog
// @desc    Add proposalstatuscatalog
// @access  Private
router.post('/',
	[
		auth
	],
	async (req, res) => {
		
		const {
			status_name
		} = req.body;

		// Build proposalstatuscatalog object
		const proposalstatuscatalogFields = {};
		if (status_name) proposalstatuscatalogFields.status_name = status_name;

		try {
			// create
			let proposalstatuscatalog = new ProposalStatusCatalog(proposalstatuscatalogFields);

			await proposalstatuscatalog.save();

			return res.json(proposalstatuscatalog);

		} catch (err) {
			
			res.status(500).send('Server Error');
        }

    });

// @route   GET api/proposalstatuscatalog/:id
// @desc    Get proposalstatuscatalog by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {

		const proposalstatuscatalog = await ProposalStatusCatalog.findOne({ _id: req.params.id });

		if (!proposalstatuscatalog) {
			res.status(400).json({ msg: 'There is no proposalstatuscatalog for this id' });
		}

		res.json(proposalstatuscatalog);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   DELETE api/proposalstatuscatalog/:id
// @desc    Delete proposalstatuscatalog
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {

		let proposalstatuscatalog = await ProposalStatusCatalog.findOne({ _id: req.params.id });

		// if (proposalstatuscatalog.freelancer_id.toString() !== req.user.id) {
		// 	return res.status(400).json({ msg: 'You cannot delete someone else proposalstatuscatalog' });
		// }

		// Remove proposalstatuscatalog
		await ProposalStatusCatalog.findOneAndRemove({ _id: req.params.id });

		res.json({ msg: 'ProposalStatusCatalog deleted' });
	} catch (err) {
		

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'ProposalStatusCatalog not found' });
		}

		res.status(500).status('Server Error');
	}
});

module.exports = router;
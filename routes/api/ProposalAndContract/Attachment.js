const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");


const Attachment = require("../../../models/ProposalAndContract/Attachment");

// @route   GET api/attachment
// @desc    Get attachment lookup list
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const attachment = await Attachment.find();

		if (!attachment) {
			res.status(400).json({ msg: 'There is no attachment' });
		}

		res.json(attachment);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});


// @route   POST api/attachment
// @desc    Add attachment
// @access  Private
router.post('/',
	[
		auth
	],
	async (req, res) => {
		
		const {
			message_id,
			attachment_link
		} = req.body;

		// Build attachment object
		const attachmentFields = {};
		if (message_id) attachmentFields.message_id = message_id;
		if (attachment_link) attachmentFields.attachment_link = attachment_link;

		try {
			// create
			let attachment = new Attachment(attachmentFields);

			await attachment.save();

			return res.json(attachment);

		} catch (err) {
			
			res.status(500).send('Server Error');
        }

    });

// @route   GET api/attachment/:id
// @desc    Get attachment by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {

		const attachment = await Attachment.findOne({ _id: req.params.id });

		if (!attachment) {
			res.status(400).json({ msg: 'There is no attachment for this id' });
		}

		res.json(attachment);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   DELETE api/attachment/:id
// @desc    Delete attachment
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {

		let attachment = await Attachment.findOne({ _id: req.params.id });

		if (!attachment) {
			res.status(400).json({ msg: 'Attachment not found' });
		} else {
			// Remove attachment
			await Attachment.findOneAndRemove({ _id: req.params.id });
			res.json({ msg: 'Attachment deleted' });
		}

	} catch (err) {
		

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Attachment not found' });
		}

		res.status(500).status('Server Error');
	}
});

module.exports = router;
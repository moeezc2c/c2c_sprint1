const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");
const s3Services = require("../../../middleware/multer-s3.service")
const Message = require("../../../models/ProposalAndContract/Message");
const User = require("../../../models/User")

// @route   GET api/message
// @desc    Get message lookup list
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const message = await Message.find();

		if (!message) {
			res.status(400).json({ msg: 'There is no message' });
		}

		res.json(message);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/message
// @desc    Add message
// @access  Private
router.post('/',
	[
		auth
	],
	async (req, res) => {

		const {
			freelancer_id,
			user_name,
			hire_manager_id,
			message_text,
			message_type,
			message_file_properties,
			proposal_id,
			proposal_catalog_status_id
		} = req.body;

		// Build message object
		const messageFields = {};
		if (freelancer_id) messageFields.freelancer_id = freelancer_id;
		if (user_name) messageFields.user_name = user_name;
		if (hire_manager_id) messageFields.hire_manager_id = hire_manager_id;
		if (message_text) messageFields.message_text = message_text;
		if (message_type) messageFields.message_type = message_type;
		if (message_file_properties) messageFields.message_file_properties = message_file_properties;
		if (proposal_id) messageFields.proposal_id = proposal_id;
		if (proposal_catalog_status_id) messageFields.proposal_catalog_status_id = proposal_catalog_status_id;

		try {
			// create
			let message = new Message(messageFields);

			await message.save();

			return res.json(message);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

// @route   GET api/message/:id
// @desc    Get message by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {
		const message = await Message.find({ proposal_id: req.params.id });

		if (!message) {
			res.status(400).json({ msg: 'There is no message for this id' });
		}

		res.json(message);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});

// @route   Update api/message/read
// @desc    Update message read
// @access  Private
router.put('/read/:id', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		const message = await Message.updateMany({ $and: [{ proposal_id: req.params.id }, { $or: [{ freelancer_id: req.user.id }, { hire_manager_id: req.user.id }] },{user_name : {$ne : user.user_name }}] }, { $set: { read: true } });
		
		if (!message) {
			return res.status(400).json({ msg: 'There is no message for this id' });
		}

		res.status(200).json("Updated");
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
})

// @route   DELETE api/message/:id
// @desc    Delete message
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {

		let message = await Message.findOne({ _id: req.params.id });

		if (!message) {
			res.status(400).json({ msg: 'Message not found' });
		} else {
			// Remove message
			if (message.message_type === "file") {
				await s3Services.deleteObject(message.message_file_properties.file_name);
			}
			await Message.findOneAndRemove({ _id: req.params.id });
			res.json({ msg: 'Message deleted' });
		}

	} catch (err) {
		

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Message not found' });
		}

		res.status(500).status('Server Error');
	}
});

module.exports = router;
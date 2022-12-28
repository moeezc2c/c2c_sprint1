const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");
const twilio = require('twilio');

const Phone = require("../../../models/Freelancer/Phone");

// @route   GET api/phone
// @desc    Get current user phone number
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const phone = await Phone.findOne({ user_id: req.user.id });
		res.json(phone);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/phone
// @desc    Create / Update phone number
// @access  Private
router.post('/',
	[
		auth,
		check('phone', 'Phone number is required').not().isEmpty(),
	],
	async (req, res) => {

		try {
			const {
				phone,
				codeBody
			} = req.body;
			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}

			/*
			const accountSid = process.env.TWILIO_ACCOUNT_SID;
			const authToken = process.env.TWILIO_AUTH_TOKEN;
			const client = new twilio(accountSid, authToken);
			*/

			const accountSid = 'AC96583873b67b9c27b9fa690df1375f66'; 
			const authToken = '40a71429ad84d30d698dfcc20dc0a829'; 
			const client = require('twilio')(accountSid, authToken); 

			client.messages
				.create({
					body: 'Here is your verification code ' + codeBody + ' , kindly do not share it with anyone.',
					//from: '+13605030661',
					messagingServiceSid: 'MG1c2cc6f2988c71a022c65213a5f4928e', 
					to: phone
				})
				//.then(message => console.log(message));
				.then(message => console.log((message.sid)));

			// Build phone object
			const phoneFields = {};
			phoneFields.user_id = req.user.id;
			if (phone) phoneFields.phone = phone;
			if (codeBody) phoneFields.codeBody = codeBody;
			phoneFields.verified = "no";

			let phoneModel = await Phone.findOne({ user_id: req.user.id });

			if (phoneModel) {

				// Update
				phoneModel = await Phone.findOneAndUpdate({ user_id: req.user.id }, { $set: phoneFields }, { new: true });

				return res.json(phoneModel);
			}

			// Create
			phoneModel = new Phone(phoneFields);

			await phoneModel.save();

			return res.json(phoneModel);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}
	});


// @route   POST api/phone/checkCode
// @desc    Create / Update phone number
// @access  Private
router.post('/checkCode',
	[
		auth
	],
	async (req, res) => {
		const {
			codeBodyTextVal
		} = req.body;

		// Build phone object
		const phoneFields = {};
		phoneFields.verified = "yes";

		try {

			let phone = await Phone.findOne({ user_id: req.user.id });

			if (phone.codeBody == codeBodyTextVal) {

				// Update
				let phone = await Phone.findOneAndUpdate({ codeBody: codeBodyTextVal }, { $set: phoneFields }, { new: true });

				return res.json(phone);

			} else {

				return res.json({
					"error": "Incorrect Code"
				})
			}

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

module.exports = router;
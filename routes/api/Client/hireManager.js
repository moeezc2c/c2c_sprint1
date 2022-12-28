const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");

const HireManager = require("../../../models/Client/HireManager");

// @route   GET api/hireManager
// @desc    Get client/manager profile
// @access  Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await HireManager.findOne({ user_account_id: req.user.id });
		res.setHeader('Content-Type', 'application/json');
		if (!profile) {
			res.status(400).json({ msg: 'There is no profile for this user' });
		}
		else{
			res.json(profile);
			//console.log("found");
		}
		//res.json(profile);
	} catch (err) {
		//console.error(err.message);
		res.status(500).send('Server Error');
	}
});


// @route   POST api/hireManager
// @desc    Create or update client/manager profile
// @access  Private
router.post('/',
	[
		auth
	],
	async (req, res) => {
		const {
			company_id,
            overview,
            skills_level_id,
            experience_level,
            location,
		} = req.body;

		// Build profile object
		const profileFields = {};
		profileFields.user_account_id = req.user.id;
		if (company_id) profileFields.company_id = company_id;
		if (overview) profileFields.overview = overview;
		if (skills_level_id) profileFields.skills_level_id = skills_level_id;
		if (experience_level) profileFields.experience_level = experience_level;
		if (location) profileFields.location = location;

		try {
			let client = await HireManager.findOne({ user_account_id: req.user.id });
			if (client) {
				// Update
				client = await HireManager.findOneAndUpdate({ user_account_id: req.user.id }, { $set: profileFields }, { new: true });

				return res.json(client);
			}

			// Create
			client = new HireManager(profileFields);

			await client.save();

			return res.json(client);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});


// @route   GET api/hireManager/user/:user_id
// @desc    Get client/manager by user ID
// @access  Private
router.get('/user/:user_id', auth, async (req, res) => {
	try {
		const client = await HireManager.findOne({ _id: req.params.user_id });

		if (!client) {
			return res.status(400).json({ msg: 'Client not found' });
		}

		res.json(client);
	} catch (err) {
		

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'client not found' });
		}

		res.status(500).status('Server Error');
	}
})


// @route   GET api/hireManager
// @desc    Get all clients/managers
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const clients = await HireManager.find();
		res.json(clients);
	} catch (err) {
		
		res.status(500).status('Server Error');
	}
})

// @route   DELETE api/hireManager
// @desc    Delete client/manager
// @access  Private
router.delete('/', auth, async (req, res) => {
	try {

		// Remove client
		await HireManager.findOneAndRemove({ user_account_id: req.user.id });

        // TODO: Remove User

		res.json({ msg: 'Client deleted' });
	} catch (err) {
		

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Client not found' });
		}

		res.status(500).status('Server Error');
	}
});

module.exports = router;
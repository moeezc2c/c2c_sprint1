const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");

const Expertise = require("../../../models/Freelancer/Expertise");

// @route   GET api/expertise
// @desc    Get current user expertise
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const expertise = await Expertise.findOne({ freelancer_id: req.user.id });
		res.json(expertise);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/expertise
// @desc    Create / Update expertise
// @access  Private
/*
router.post('/',
	[
		auth
	],
	async (req, res) => {
*/
router.post('/', auth, async (req, res) => {
		const {
			category,
			skills
		} = req.body;

		// Build certification object
		const expertiseFields = {};
		expertiseFields.freelancer_id = req.user.id;
		if (category) expertiseFields.category = category;
		if (skills) expertiseFields.skills = skills;

        try {
			let expertise = await Expertise.findOne({ freelancer_id: req.user.id });

			if (expertise) {
				// Update
				expertise = await Expertise.findOneAndUpdate({ freelancer_id: req.user.id }, { $set: expertiseFields }, { new: true });

				return res.json(expertise);
			}
			else{
				// Create
				expertise = new Expertise(expertiseFields);
				await expertise.save();
				return res.json(expertise);
			}

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

module.exports = router;
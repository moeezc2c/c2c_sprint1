const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");

const ExpertLevel = require("../../../models/Freelancer/ExpertLevel");

// @route   GET api/expertLevel
// @desc    Get current user expertLevel
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const expertLevel = await ExpertLevel.findOne({ freelancer_id: req.user.id });
		res.json(expertLevel);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/expertLevel
// @desc    Create / Update expert level
// @access  Private
router.post('/',
	[
		auth
	],
	async (req, res) => {
		const {
			expert_level,
		} = req.body;

		// Build expert level object
		const expertLevelFields = {};
		expertLevelFields.freelancer_id = req.user.id;
		if (expert_level) expertLevelFields.expert_level = expert_level;

        try {
			let expertLevel = await ExpertLevel.findOne({ freelancer_id: req.user.id });

			if (expertLevel) {
				// Update
				expertLevel = await ExpertLevel.findOneAndUpdate({ freelancer_id: req.user.id }, { $set: expertLevelFields }, { new: true });

				return res.json(expertLevel);
			}

			// Create
			expertLevel = new ExpertLevel(expertLevelFields);

			await expertLevel.save();

			return res.json(expertLevel);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");

const HasSkill = require("../../../models/Freelancer/HasSkill");

// @route   GET api/hasSkill
// @desc    Get freelancer skills
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const skills = await HasSkill.findOne({ freelancer_id: req.user.id });
		res.json(skills);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/hasSkill
// @desc    Create or update freelancer skills
// @access  Private
router.post('/',
	[
		auth
	],
	async (req, res) => {

		const {
			skill_id,
		} = req.body;

		// Build has skill object
		const hasSkillFields = {};
		hasSkillFields.freelancer_id = req.user.id;
		if (skill_id) hasSkillFields.skill_id = skill_id;

		try {
			let hasSkill = await HasSkill.findOne({ freelancer_id: req.user.id });

			if (hasSkill) {
				// Update
				hasSkill = await HasSkill.findOneAndUpdate({ freelancer_id: req.user.id }, { $set: hasSkillFields }, { new: true });

				return res.json(hasSkill);
			}

			// Create
			hasSkill = new HasSkill(hasSkillFields);

			await hasSkill.save();

			return res.json(hasSkill);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});


module.exports = router;
const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");


const Skill = require("../../models/Skill");

// @route   GET api/skill
// @desc    Get skills lookup list
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const skills = await Skill.find();

		if (!skills) {
			res.status(400).json({ msg: 'There is no skill' });
		}

		res.json(skills);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/skill
// @desc    Add skill
// @access  Private
router.post('/',
	[
		auth,
		check('skill_name', 'Skill name is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			skill_name
		} = req.body;

		// Build skill object
		const skillFields = {};
		if (skill_name) skillFields.skill_name = skill_name;

		try {
			// create
			let skill = new Skill(skillFields);

			await skill.save();

			return res.json(skill);

		} catch (err) {
			
			res.status(500).send('Server Error');
        }

    });

// @route   GET api/skill/:id
// @desc    Get skill by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {

		const skill = await Skill.findOne({ _id: req.params.id });

		if (!skill) {
			res.status(400).json({ msg: 'There is no skill for this id' });
		}

		res.json(skill);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});

module.exports = router;
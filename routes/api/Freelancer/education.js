const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Education = require("../../../models/Freelancer/Education");

// @route   GET api/education
// @desc    Get current user education
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const education = await Education.find({ freelancer_id: req.user.id });

		if (!education) {
			res.status(400).json({ msg: 'There is no eduction for this user' });
		}

		res.json(education);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   GET api/education/:id
// @desc    Get current user education by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {

		const education = await Education.findOne({ _id: req.params.id, freelancer_id: req.user.id });

		if (!education) {
			res.status(400).json({ msg: 'There is no education for this user' });
		}

		res.json(education);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});

// @route   POST api/education
// @desc    Create education
// @access  Private
router.post('/',
	[
		auth,
		check('provider', 'College name is required').not().isEmpty(),
		check('from', 'From is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			provider,
			from,
			to,
			current,
			degree,
			specialization,
			description,
		} = req.body;

		// Build education object
		const educationFields = {};
		educationFields.freelancer_id = req.user.id;
		if (provider) educationFields.provider = provider;
		if (from) educationFields.from = from;
		if (to) educationFields.to = to;
		if (current) educationFields.current = current;
		if (degree) educationFields.degree = degree;
		if (specialization) educationFields.specialization = specialization;
		if (description) educationFields.description = description;

		try {
			// create
			let education = new Education(educationFields);

			await education.save();

			return res.json(education);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

// @route   PUT api/education/:id
// @desc    Update user education by id
// @access  Private
router.put('/:id',
	[
		auth,
		check('provider', 'College name is required').not().isEmpty(),
		check('from', 'From is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			provider,
			from,
			to,
			current,
			degree,
			specialization,
			description,
		} = req.body;

		// Build education object
		const educationFields = {};
		educationFields.freelancer_id = req.user.id;
		if (provider) educationFields.provider = provider;
		if (from) educationFields.from = from;
		if (to) educationFields.to = to;
		if (current) educationFields.current = current;
		if (degree) educationFields.degree = degree;
		if (specialization) educationFields.specialization = specialization;
		if (description) educationFields.description = description;

		try {
			let education = await Education.findOne({ _id: req.params.id });

			if (!education) {
				return res.status(400).json({ msg: 'Education not found' });
			}

			if (education.freelancer_id.toString() !== req.user.id) {
				return res.status(400).json({ msg: 'You cannot edit someone else Education' });
			}

			// Update
			education = await Education.findOneAndUpdate({ _id: req.params.id }, { $set: educationFields }, { new: true });

			return res.json(education);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

// @route   DELETE api/education/:id
// @desc    Delete education
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {

		let education = await Education.findOne({ _id: req.params.id });

		if (education.freelancer_id.toString() !== req.user.id) {
			return res.status(400).json({ msg: 'You cannot delete someone else education' });
		}

		// Remove education
		await Education.findOneAndRemove({ _id: req.params.id });

		res.json({ msg: 'Education deleted' });
	} catch (err) {
		

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Education not found' });
		}

		res.status(500).status('Server Error');
	}
});

module.exports = router;
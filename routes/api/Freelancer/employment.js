const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Employment = require("../../../models/Freelancer/Employment");

// @route   GET api/employment
// @desc    Get current user employment
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const employment = await Employment.find({ freelancer_id: req.user.id });

		if (!employment) {
			res.status(400).json({ msg: 'There is no employment for this user' });
		}

		res.json(employment);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   GET api/employment/:id
// @desc    Get current user employment by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {

		const employment = await Employment.findOne({ _id: req.params.id, freelancer_id: req.user.id });

		if (!employment) {
			res.status(400).json({ msg: 'There is no employment for this user' });
		}

		res.json(employment);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});

// @route   POST api/employment
// @desc    Create employment
// @access  Private
router.post('/',
	[
		auth,
		check('company_name', 'Company name is required').not().isEmpty(),
		check('city', 'City is required').not().isEmpty(),
        check('country', 'Country is required').not().isEmpty(),		
        check('title', 'Title is required').not().isEmpty(),
        check('from', 'From is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company_name,
			city,
			country,
			title,
			from,
			to,
			current,
			description,
		} = req.body;


		// Build employment object
		const employmentFields = {};
		employmentFields.freelancer_id = req.user.id;
		if (company_name) employmentFields.company_name = company_name;
		if (city) employmentFields.city = city;
		if (country) employmentFields.country = country;
		if (title) employmentFields.title = title;
		if (from) employmentFields.from = from;
		if (to) employmentFields.to = to;
		if (current) employmentFields.current = current;
		if (description) employmentFields.description = description;

		try {
			// create
			let employment = new Employment(employmentFields);

			await employment.save();

			return res.json(employment);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

// @route   PUT api/employment/:id
// @desc    Update user employment by id
// @access  Private
router.put('/:id',
	[
		auth,
		check('company_name', 'Company name is required').not().isEmpty(),
		check('city', 'City is required').not().isEmpty(),
        check('country', 'Country is required').not().isEmpty(),		
        check('title', 'Title is required').not().isEmpty(),
        check('from', 'From is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company_name,
			city,
			country,
			title,
			from,
			to,
			current,
			description,
		} = req.body;

		// Build employment object
		const employmentFields = {};
		employmentFields.freelancer_id = req.user.id;
		if (company_name) employmentFields.company_name = company_name;
		if (city) employmentFields.city = city;
		if (country) employmentFields.country = country;
		if (title) employmentFields.title = title;
		if (from) employmentFields.from = from;
		if (to) employmentFields.to = to;
		if (current) employmentFields.current = current;
		if (description) employmentFields.description = description;

		try {
			let employment = await Employment.findOne({ _id: req.params.id });

			if (!employment) {
				return res.status(400).json({ msg: 'Employment not found' });
			}

			if (employment.freelancer_id.toString() !== req.user.id) {
				return res.status(400).json({ msg: 'You cannot edit someone else Employment' });
			}

			// Update
			employment = await Employment.findOneAndUpdate({ _id: req.params.id }, { $set: employmentFields }, { new: true });

			return res.json(employment);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

// @route   DELETE api/employment/:id
// @desc    Delete employment
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {

		let employment = await Employment.findOne({ _id: req.params.id });

		if (employment.freelancer_id.toString() !== req.user.id) {
			return res.status(400).json({ msg: 'You cannot delete someone else employment' });
		}

		// Remove employment
		await Employment.findOneAndRemove({ _id: req.params.id });

		res.json({ msg: 'Employment deleted' });
	} catch (err) {
		

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Employment not found' });
		}

		res.status(500).status('Server Error');
	}
});

module.exports = router;
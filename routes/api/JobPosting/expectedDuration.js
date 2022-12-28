const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");


const ExpectedDuration = require("../../../models/JobPosting/ExpectedDuration");

// @route   GET api/expectedDuration
// @desc    Get expected duration lookup list
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const expectedDuration = await ExpectedDuration.find();

		if (!expectedDuration) {
			res.status(400).json({ msg: 'There is no expected duration' });
		}

		res.json(expectedDuration);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/expectedDuration
// @desc    Add expected duration
// @access  Private
router.post('/',
	[
		auth,
		check('duration_text', 'Duration text is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			duration_text
		} = req.body;

		// Build expected duration object
		const expectedDurationFields = {};
		if (duration_text) expectedDurationFields.duration_text = duration_text;

		try {
			// create
			let expectedDuration = new ExpectedDuration(expectedDurationFields);

			await expectedDuration.save();

			return res.json(expectedDuration);

		} catch (err) {
			
			res.status(500).send('Server Error');
        }

    });

// @route   GET api/expectedDuration/:id
// @desc    Get expected duration by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {

		const expectedDuration = await ExpectedDuration.findOne({ _id: req.params.id });

		if (!expectedDuration) {
			res.status(400).json({ msg: 'There is no expected duration for this id' });
		}

		res.json(expectedDuration);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});

module.exports = router;
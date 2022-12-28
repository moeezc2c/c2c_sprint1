const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");

const HourlyRate = require("../../../models/Freelancer/HourlyRate");

// @route   GET api/hourlyRate
// @desc    Get current user hourlyRate
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const hourlyRate = await HourlyRate.findOne({ freelancer_id: req.user.id });
		res.json(hourlyRate);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/language
// @desc    Create / Update language
// @access  Private
router.post('/',
	[
		auth,
        check('hourly_rate', 'Hourly Rate is required').not().isEmpty(),
	],
	async (req, res) => {
		const {
			hourly_rate,
		} = req.body;

        const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Build hourly rate object
		const hourlyRateFields = {};
		hourlyRateFields.freelancer_id = req.user.id;
		if (hourly_rate) hourlyRateFields.hourly_rate = hourly_rate;

        try {
			let hourlyRate = await HourlyRate.findOne({ freelancer_id: req.user.id });

			if (hourlyRate) {
				// Update
				hourlyRate = await HourlyRate.findOneAndUpdate({ freelancer_id: req.user.id }, { $set: hourlyRateFields }, { new: true });

				return res.json(hourlyRate);
			}

			// Create
			hourlyRate = new HourlyRate(hourlyRateFields);

			await hourlyRate.save();

			return res.json(hourlyRate);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

module.exports = router;
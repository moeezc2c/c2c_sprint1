const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Location = require("../../../models/Freelancer/Location");

// @route   GET api/location
// @desc    Get current user profile location
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const location = await Location.findOne({ freelancer_id: req.user.id });
		res.json(location);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/location
// @desc    Create / Update location
// @access  Private
router.post('/',
	[
		auth,
        check('country', 'Country is required').not().isEmpty(),
        check('address', 'Address is required').not().isEmpty(),
	],
	async (req, res) => {
		const {
			country,
            address,
            suite,
            city,
            province,
			zip,
		} = req.body;

        const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Build location object
		const locationFields = {};
		locationFields.freelancer_id = req.user.id;
		if (country) locationFields.country = country;
		if (address) locationFields.address = address;
		if (suite) locationFields.suite = suite;
		if (city) locationFields.city = city;
		if (province) locationFields.province = province;
		if (zip) locationFields.zip = zip;

        try {
			let location = await Location.findOne({ freelancer_id: req.user.id });

			if (location) {
				// Update
				location = await Location.findOneAndUpdate({ freelancer_id: req.user.id }, { $set: locationFields }, { new: true });

				return res.json(location);
			}

			// Create
			location = new Location(locationFields);

			await location.save();

			return res.json(location);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

module.exports = router;
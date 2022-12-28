const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");

const TitleAndOverview = require("../../../models/Freelancer/TitleAndOverview");

// @route   GET api/titleAndOverview
// @desc    Get current user titleAndOverview
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const titleAndOverview = await TitleAndOverview.findOne({ freelancer_id: req.user.id });
		res.json(titleAndOverview);
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
        check('title', 'Title is required').not().isEmpty(),
        check('professional_overview', 'Professional Overview is required').not().isEmpty(),
	],
	async (req, res) => {
		const {
			title,
            professional_overview
		} = req.body;

        const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Build hourly rate object
		const titleAndOverviewFields = {};
		titleAndOverviewFields.freelancer_id = req.user.id;
		if (title) titleAndOverviewFields.title = title;
		if (professional_overview) titleAndOverviewFields.professional_overview = professional_overview;

        try {
			let titleAndOverview = await TitleAndOverview.findOne({ freelancer_id: req.user.id });

			if (titleAndOverview) {
				// Update
				titleAndOverview = await TitleAndOverview.findOneAndUpdate({ freelancer_id: req.user.id }, { $set: titleAndOverviewFields }, { new: true });

				return res.json(titleAndOverview);
			}

			// Create
			titleAndOverview = new TitleAndOverview(titleAndOverviewFields);

			await titleAndOverview.save();

			return res.json(titleAndOverview);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

module.exports = router;
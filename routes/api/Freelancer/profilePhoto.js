const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");

const ProfilePhoto = require("../../../models/Freelancer/ProfilePhoto");

// @route   GET api/profilePhoto
// @desc    Get current user profile photo
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const profilePhoto = await ProfilePhoto.findOne({ freelancer_id: req.user.id });
		res.json(profilePhoto);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/profilePhoto
// @desc    Create / Update profile photo
// @access  Private
router.post('/',
	[
		auth,
        check('photo_link', 'Photo link is required').not().isEmpty(),
	],
	async (req, res) => {
		const {
			photo_link,
		} = req.body;

        const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// Build profile photo object
		const profilePhotoFields = {};
		profilePhotoFields.freelancer_id = req.user.id;
		if (photo_link) profilePhotoFields.photo_link = photo_link;

        try {
			let profilePhoto = await ProfilePhoto.findOne({ freelancer_id: req.user.id });

			if (profilePhoto) {
				// Update
				profilePhoto = await ProfilePhoto.findOneAndUpdate({ freelancer_id: req.user.id }, { $set: profilePhotoFields }, { new: true });

				return res.json(profilePhoto);
			}

			// Create
			profilePhoto = new ProfilePhoto(profilePhotoFields);

			await profilePhoto.save();

			return res.json(profilePhoto);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

module.exports = router;
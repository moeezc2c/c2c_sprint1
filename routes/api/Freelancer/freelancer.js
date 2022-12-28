const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");
const Certification = require("../../../models/Freelancer/Certification");
const Education = require("../../../models/Freelancer/Education");
const Employment = require("../../../models/Freelancer/Employment");
const Expertise = require("../../../models/Freelancer/Expertise");
const ExpertLevel = require("../../../models/Freelancer/ExpertLevel");
const HourlyRate = require("../../../models/Freelancer/HourlyRate");
const Language = require("../../../models/Freelancer/Language");
const Location = require("../../../models/Freelancer/Location");
const Phone = require("../../../models/Freelancer/Phone");
const ProfilePhoto = require("../../../models/Freelancer/ProfilePhoto");
const TitleAndOverview = require("../../../models/Freelancer/TitleAndOverview");

const Freelancer = require("../../../models/Freelancer/Freelancer");

// @route   GET api/freelancer
// @desc    Get freelancer profile
// @access  Private
router.get('/me', auth, async (req, res) => {
	try {
		const profile = await Freelancer.findOne({ user_id: req.user.id });

		if (!profile) {
			res.status(400).json({ msg: 'There is no profile for this user' });
		}

		res.json({status: true,data:profile});
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/freelancer
// @desc    Create or update freelancer profile
// @access  Private
router.post('/',
	[
		auth,
	],
	async (req, res) => {
		try {
			let freelancer = await Freelancer.findOne({ user_id: req.user.id });

			if (freelancer) {
				return res.json(freelancer);
			}

			let education = await Education.findOne({ freelancer_id: req.user.id });
			let certification = await Certification.findOne({ freelancer_id: req.user.id });
			let employment = await Employment.findOne({ freelancer_id: req.user.id });
			let expertise = await Expertise.findOne({ freelancer_id: req.user.id });
			let expertLevel = await ExpertLevel.findOne({ freelancer_id: req.user.id });
			let hourlyRate = await HourlyRate.findOne({ freelancer_id: req.user.id });
			let location = await Location.findOne({ freelancer_id: req.user.id });
			let phone = await Phone.findOne({ user_id: req.user.id });
			let profilePhoto = await ProfilePhoto.findOne({ freelancer_id: req.user.id });
			let titleAndOverview = await TitleAndOverview.findOne({ freelancer_id: req.user.id });

			if(!education || !titleAndOverview || !certification || !employment ||
				!expertise || !expertLevel || !hourlyRate || !location || !phone || !profilePhoto) {
				return res.status(400).json({ msg: 'Kindly COmplete Your Profile' });
			}
			
			let freelancerSCH = {};
			freelancerSCH.user_id = req.user.id,
			freelancerSCH.certification= certification._id,
			freelancerSCH.education= education._id,
			freelancerSCH.employment= employment._id,
			freelancerSCH.expertise= expertise._id,
			freelancerSCH.expertLevel= expertLevel._id,
			freelancerSCH.hourlyRate= hourlyRate._id,
			freelancerSCH.location= location._id,
			freelancerSCH.phone= phone._id,
			freelancerSCH.profilePhoto= profilePhoto._id,
			freelancerSCH.titleAndOverview= titleAndOverview._id

			let freelancerSave = new Freelancer(freelancerSCH);
			await freelancerSave.save();

			return res.json(freelancerSave);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});


// @route   GET api/freelancer/user/:user_id
// @desc    Get freelancer by user ID
// @access  Private
router.get('/user/:id', auth, async (req, res) => {
	try {
		let id  = req.params.id;
		const freelancer = id ? await Freelancer.findOne({ user_id: id }) : await Freelancer.findOne({ user_id: req.user.id })

		if (!freelancer) {
			return res.status(400).json({ msg: 'Freelancer not found' });
		}

		res.json(freelancer);
	} catch (err) {
		

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Freelancer not found' });
		}

		res.status(500).status('Server Error');
	}
})


// @route   GET api/freelancer
// @desc    Get all freelancers
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const freelancers = await Freelancer.find().lean();
		res.json(freelancers);
	} catch (err) {
		
		res.status(500).status('Server Error');
	}
})

// @route   DELETE api/freelancer
// @desc    Delete freelancer
// @access  Private
router.delete('/', auth, async (req, res) => {
	try {

		// Remove freelancer
		await Freelancer.findOneAndRemove({ user_id: req.user.id });

        // TODO: Remove User

		res.json({ msg: 'Freelancer deleted' });
	} catch (err) {
		

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Freelancer not found' });
		}

		res.status(500).status('Server Error');
	}
});

module.exports = router;
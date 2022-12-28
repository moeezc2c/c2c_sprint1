const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Certification = require("../../../models/Freelancer/Certification");

// @route   GET api/certifications
// @desc    Get current user certifications
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const certifications = await Certification.find({ freelancer_id: req.user.id });

		if (!certifications) {
			res.status(400).json({ msg: 'There is no certifications for this user' });
		}

		res.json(certifications);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   GET api/certifications/:id
// @desc    Get current user certifications by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {

		const certification = await Certification.findOne({ _id: req.params.id, freelancer_id: req.user.id });

		if (!certification) {
			res.status(400).json({ msg: 'There is no certification for this user' });
		}

		res.json(certification);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});

// @route   POST api/certifications
// @desc    Create certification
// @access  Private
router.post('/',
	[
		auth,
		check('certification_name', 'Certification is required').not().isEmpty(),
		check('provider', 'Provider is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			certification_name,
			provider,
			description,
			certification_link
		} = req.body;

		// Build certification object
		const certificationFields = {};
		certificationFields.freelancer_id = req.user.id;
		if (certification_name) certificationFields.certification_name = certification_name;
		if (provider) certificationFields.provider = provider;
		if (description) certificationFields.description = description;
		if (certification_link) certificationFields.certification_link = certification_link;

		try {
			// create
			let certification = new Certification(certificationFields);

			await certification.save();

			return res.json(certification);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

// @route   PUT api/certifications/:id
// @desc    Update user certification by id
// @access  Private
router.put('/:id',
	[
		auth,
		check('certification_name', 'Certification is required').not().isEmpty(),
		check('provider', 'Provider is required').not().isEmpty(),
        check('description', 'Description is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			certification_name,
			provider,
			description,
			certification_link
		} = req.body;

		// Build certification object
		const certificationFields = {};
		certificationFields.freelancer_id = req.user.id;
		if (certification_name) certificationFields.certification_name = certification_name;
		if (provider) certificationFields.provider = provider;
		if (description) certificationFields.description = description;
		if (certification_link) certificationFields.certification_link = certification_link;

		try {
			let certification = await Certification.findOne({ _id: req.params.id });

			if (!certification) {
				return res.status(400).json({ msg: 'Certification not found' });
			}

			if (certification.freelancer_id.toString() !== req.user.id) {
				return res.status(400).json({ msg: 'You cannot edit someone else certification' });
			}

			// Update
			certification = await Certification.findOneAndUpdate({ _id: req.params.id }, { $set: certificationFields }, { new: true });

			return res.json(certification);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

// @route   DELETE api/certifications/:id
// @desc    Delete certification
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {

		let certification = await Certification.findOne({ _id: req.params.id });

		if (certification.freelancer_id.toString() !== req.user.id) {
			return res.status(400).json({ msg: 'You cannot delete someone else certification' });
		}

		// Remove certification
		await Certification.findOneAndRemove({ _id: req.params.id });

		res.json({ msg: 'Certification deleted' });
	} catch (err) {
		

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Certification not found' });
		}

		res.status(500).status('Server Error');
	}
});

module.exports = router;
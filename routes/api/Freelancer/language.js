const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Language = require("../../../models/Freelancer/Language");

// @route   GET api/language
// @desc    Get current user languages
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const languages = await Language.find({ freelancer_id: req.user.id });

		if (!languages) {
			res.status(400).json({ msg: 'There is no languages for this user' });
		}

		res.json(languages);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   GET api/language/:id
// @desc    Get current user languages by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {

		const language = await Language.findOne({ _id: req.params.id, freelancer_id: req.user.id });

		if (!language) {
			res.status(400).json({ msg: 'There is no languages for this user' });
		}

		res.json(language);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});

// @route   POST api/language
// @desc    Create language
// @access  Private
router.post('/',
	[
		auth,
		check('language', 'Language is required').not().isEmpty(),
		check('proficiency', 'Proficiency is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			language,
			proficiency
		} = req.body;

		// Build language object
		const languageFields = {};
		languageFields.freelancer_id = req.user.id;
		if (language) languageFields.language = language;
		if (proficiency) languageFields.proficiency = proficiency;

		try {
			// create
			let language = new Language(languageFields);

			await language.save();

			return res.json(language);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

// @route   PUT api/language/:id
// @desc    Update user language by id
// @access  Private
router.put('/:id',
	[
		auth,
		check('language', 'Language is required').not().isEmpty(),
		check('proficiency', 'Proficiency is required').not().isEmpty(),
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			language,
			proficiency
		} = req.body;

		// Build language object
		const languageFields = {};
		languageFields.freelancer_id = req.user.id;
		if (language) languageFields.language = language;
		if (proficiency) languageFields.proficiency = proficiency;

		try {
			let language = await Language.findOne({ _id: req.params.id });

			if (!language) {
				return res.status(400).json({ msg: 'Language not found' });
			}

			if (language.freelancer_id.toString() !== req.user.id) {
				return res.status(400).json({ msg: 'You cannot edit someone else language' });
			}

			// Update
			language = await Language.findOneAndUpdate({ _id: req.params.id }, { $set: languageFields }, { new: true });

			return res.json(language);

		} catch (err) {
			
			res.status(500).send('Server Error');
		}

	});

// @route   DELETE api/language/:id
// @desc    Delete language
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {

		let language = await Language.findOne({ _id: req.params.id });

		if (language.freelancer_id.toString() !== req.user.id) {
			return res.status(400).json({ msg: 'You cannot delete someone else language' });
		}

		// Remove language
		await Language.findOneAndRemove({ _id: req.params.id });

		res.json({ msg: 'Language deleted' });
	} catch (err) {
		

		if (err.kind == 'ObjectId') {
			return res.status(400).json({ msg: 'Language not found' });
		}

		res.status(500).status('Server Error');
	}
});

module.exports = router;
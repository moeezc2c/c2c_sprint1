const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");


const Complexity = require("../../../models/JobPosting/Complexity");

// @route   GET api/complexity
// @desc    Get complexity lookup list
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const complexity = await Complexity.find();

		if (!complexity) {
			res.status(400).json({ msg: 'There is no complexity' });
		}

		res.json(complexity);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/complexity
// @desc    Add complexity
// @access  Private
router.post('/',
	[
		auth,
		check('complexity', 'Compexity name is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			complexity
		} = req.body;

		// Build complexity object
		const complexityFields = {};
		if (complexity) complexityFields.complexity = complexity;

		try {
			// create
			let complexity = new Complexity(complexityFields);

			await complexity.save();

			return res.json(complexity);

		} catch (err) {
			
			res.status(500).send('Server Error');
        }

    });

// @route   GET api/complexity/:id
// @desc    Get complexity by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {

		const complexity = await Complexity.findOne({ _id: req.params.id });

		if (!complexity) {
			res.status(400).json({ msg: 'There is no complexity for this id' });
		}

		res.json(complexity);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});

module.exports = router;
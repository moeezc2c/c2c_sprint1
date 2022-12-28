const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const { check, validationResult } = require("express-validator");


const Company = require("../../../models/Client/Company");

// @route   GET api/company
// @desc    Get company lookup list
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const company = await Company.find();

		if (!company) {
			res.status(400).json({ msg: 'There is no payment type' });
		}

		res.json(company);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


// @route   POST api/company
// @desc    Add company
// @access  Private
router.post('/',
	[
		auth,
		check('company_name', 'Company name is required').not().isEmpty(),
		check('company_location', 'Company location is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company_name,
			company_location
		} = req.body;

		// Build company object
		const companyFields = {};
		if (company_name) companyFields.company_name = company_name;
		if (company_location) companyFields.company_location = company_location;

		try {
			// create
			let company = new Company(companyFields);

			await company.save();

			return res.json(company);

		} catch (err) {
			
			res.status(500).send('Server Error');
        }

    });

// @route   GET api/company/:id
// @desc    Get company by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {

		const company = await Company.findOne({ _id: req.params.id });

		if (!company) {
			res.status(400).json({ msg: 'There is no company for this id' });
		}

		res.json(company);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});


module.exports = router;
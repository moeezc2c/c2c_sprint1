const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");


const PaymentType = require("../../models/PaymentType");

// @route   GET api/paymentType
// @desc    Get payment type lookup list
// @access  Private
router.get('/', auth, async (req, res) => {
	try {
		const paymentType = await PaymentType.find();

		if (!paymentType) {
			res.status(400).json({ msg: 'There is no payment type' });
		}

		res.json(paymentType);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});


// @route   POST api/paymentType
// @desc    Add payment type
// @access  Private
router.post('/',
	[
		auth,
		check('type_name', 'Type name is required').not().isEmpty()
	],
	async (req, res) => {
		const errors = validationResult(req);

		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			type_name
		} = req.body;

		// Build paymentType object
		const paymentTypeFields = {};
		if (type_name) paymentTypeFields.type_name = type_name;

		try {
			// create
			let typeName = new PaymentType(paymentTypeFields);

			await typeName.save();

			return res.json(typeName);

		} catch (err) {
			res.status(500).send('Server Error');
        }

    });

module.exports = router;
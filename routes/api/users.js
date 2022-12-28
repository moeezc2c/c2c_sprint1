const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../../config/keys');
const bcrypt = require('bcryptjs');

const User = require('../../models/User');
const { ExtractJwt } = require('passport-jwt');

// @route   POST api/users
// @desc    Register User
// @access  Public
router.post('/', [
	check('user_name', 'User name is required').not().isEmpty(),
	check('email', 'Please include a valid email').isEmail(),
	check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
	check('first_name', 'Please enter First Name with 2 or more characters').isLength({ min: 2 }),
	check('last_name', 'Please enter Last Name with 2 or more characters').isLength({ min: 2 }),
	check('type', 'User type is required')
], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { user_name, email, password, first_name, last_name, type } = req.body;

	try {
		let user = await User.findOne({ user_name });

		/*
		if (user) {
			return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
		};

		user = new User({
			user_name,
			email,
			password,
			first_name,
			last_name,
			type,
		});
		*/

		let e = await User.findOne({ email });

		/*
		user.approval= type ===  "Admin" ? 'Pending' : 'Approved'
		user.tfa_login = type ===  "Admin" ? true : false
		const salt = await bcrypt.genSalt(10);
		
		user.password = await bcrypt.hash(password, salt);
		await user.save();

		const payload = {
			user: {
				id: user.id
			}
		}
		*/

		if (user) {
			return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
		}
		else if(e){
			//console.log("check")
			return res.status(400).json({ errors: [{ msg: 'Email already exists' }] });
		}
		else{
			//console.log("check1")
			
			user = new User({
				user_name,
				email,
				password,
				first_name,
				last_name,
				type,
			});

			user.approval= type ===  "Admin" ? 'Pending' : 'Approved'
			const salt = await bcrypt.genSalt(10);
			
			user.password = await bcrypt.hash(password, salt);
			await user.save();
	
			const payload = {
				user: {
					id: user.id
				}
			}
			if(type!=='Admin'){
				jwt.sign(payload, jwtSecret, {
					expiresIn: 360000
				}, (err, token) => {
					if (err) throw err;
					res.json({ token })

				});
				/*
				let body = {
					title:"Welcome",
					text: `Hi Cyber To Cyber User We welcome you on cyber to cyber platform.`
				}
				try{
					await Email.sendEmail(req.body.email,body);
				}catch{
					//console.log("invalid");
					return res.status(400).json({ messgae: 'Invalid Email' });
				}
				*/
			}else{
				res.json({ msg:"Request is pending" })
			}

		}

		/*
		if(type!=='Admin'){
			jwt.sign(payload, jwtSecret, {
				expiresIn: 360000
			}, (err, token) => {
				if (err) throw err;
				res.json({ token })
			});
		}else{
			res.json({ msg:"Request is pending" })
		}
		*/
		
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}

});


module.exports = router;
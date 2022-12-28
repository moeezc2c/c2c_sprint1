const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const { jwtSecret } = require('../../config/keys');
const otpGenerator = require('otp-generator');
const sendSMS = require('../../middleware/SMS');

const User = require('../../models/User');
const Phone = require("../../models/Freelancer/Phone");
const Email = require('../../middleware/sendEmail');

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		res.json(user);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
	check('user_name', 'Username is required').exists().not().isEmpty(),
	check('password', 'Password is required').isLength({ min: 6 })
], async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	const { user_name, password } = req.body;

	try {
		let user = await User.findOne({ user_name });

		if (!user) {
			return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
		};

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
		}

		if (user.type === 'Admin') {
			if (user.approval !== 'Approved') {
				return res.status(400).json({ errors: [{ msg: 'Your request for admin status is ' + user.approval }] });
			}
		}

		const payload = {
			user: {
				id: user._id
			}
		}

		if (user.tfa_login) {
			const phone = await Phone.findOne({ user_id: user._id });
			let otpCode = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
			user.tfa_otp = otpCode;
			user.tfa_otp_expiry = Date.now() + 300000;
			await sendSMS(phone.phone, `Your Login Otp is : ${otpCode}`);
			await user.save();
			return res.status(302).json({ errors: [{ msg: 'Code Has been set to your Registered Number Kindly check' }], id: user._id });
		}

		jwt.sign(payload, jwtSecret, {
			expiresIn: 360000
		}, (err, token) => {
			if (err) throw err;
			res.json({ token, user })
		});

	} catch (err) {
		res.status(500).send('Server Error');
	}

});

router.get('/enablemfa', auth, async (req, res) => {
	try {
		let user = await User.findById(req.user.id);
		if (!user) {
			return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
		}

		const phone = await Phone.findOne({ user_id: req.user.id });

		if (!phone) {
			return res.status(400).json({ errors: [{ msg: 'Phone Number is not registered' }] });
		}

		user.tfa_login = true;
		await user.save();
		res.json({ msg: 'MFA Enabled' });

	} catch (err) {
		res.status(500).send('Server Error');
	}
})

router.post('/otpverification', async (req, res) => {
	const { id, code } = req.body;
	try {
		let user = await User.findById(id);
		if (user.tfa_otp == code) {
			if (user.tfa_otp_expiry > Date.now()) {
				const payload = {
					user: {
						id: user._id
					}
				}

				jwt.sign(payload, jwtSecret, {
					expiresIn: 360000
				}, (err, token) => {
					if (err) throw err;
					res.json({ token, user })
				});
			} else {
				return res.status(400).json({ errors: [{ msg: 'OTP Expired' }] });
			}
		} else {
			return res.status(400).json({ errors: [{ msg: 'Invalid OTP' }] });
		}
	} catch (err) {
		res.status(500).send('Server Error');
	}
})
// @route  Post api/auth/forgot-password
// @desc   Forgot password
// @access Public

router.post('/forgot-password', async (req, res) => {
	try {
		if (req.body.reset_type === 'email') {
			const user = await User.findOne({ email: req.body.email });
			if (!user) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			const payload = {
				user: {
					id: user.id
				}
			}

			jwt.sign(payload, jwtSecret, {
				expiresIn: '1h'
			}, async (err, token) => {
				let body = {
					title: "Forgot Password",
					//body: `<b>Hi Cyber To Cyber User </b></br> Kindly use below link to udpate your password. <a href='http://localhost:3000/change-password?token=${token}&reset_type=email'>Cyber to Cyber</a>`
					text: `Hi Cyber To Cyber User Kindly use below link to udpate your password. <a href='http://localhost:3000/change-password?token=${token}&reset_type=email'>Cyber to Cyber`
				}
				let date = new Date();
				if (err) throw err;
				await Email.sendEmail(req.body.email, body);
				user.password_reset_token = {
					token: token,
					expires: date.setHours(date.getHours() + 1),
					reset_type: 'email'
				}
				await user.save();
				res.status(200).json({ messgae: 'Email Sent Successfully' });
			});
		} 
		
		else if (req.body.reset_type === 'phone') {
			const phone = await Phone.findOne({ phone: req.body.phone });

			if (!phone) {
				return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
			}

			//const user = await User.findOne({ _id: phone.freelancer_id });
			const user = await User.findOne({ _id: phone.user_id });
			
			let date = new Date();
			let otpCode = otpGenerator.generate(6, { digits: true, lowerCaseAlphabets: false, upperCaseAlphabets: true, specialChars: false });
			user.password_reset_token = {
				token: otpCode,
				expires: date.setHours(date.getHours() + 1),
				reset_type: 'phone'
			}
			await user.save();

			console.log(otpCode);
			await sendSMS(phone.phone, `Your Password Reset Code is : ${otpCode}`);
			console.log("sent");
			res.status(200).json({ message: 'OTP Sent. Please Check your Phone' });
		}
		else if(req.body.EmailAdress){ 
			//Sent Welcome Email

			//console.log("Welcome");
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
			
		} else {
			return res.status(400).json({ errors: [{ msg: 'Invalid Credentials' }] });
		}

	} catch (err) {
		res.status(500).send('Server Error');
	}
})

// @router  POST api/auth/reset-password
// @desc    Reset Password
// @access  Public

router.post('/reset-password', async (req, res) => {
	try {
		let body = {
			title: "Password Reset Successfull",
			//body: "<h1>Your Password for CYBER To CYBER Account has been successfully reset.</h1> <br/> <p>Please Login with your new password.</p><br> <p>If it is not you please contact administrator.</p>"
			text: "Your Password for CYBER To CYBER Account has been successfully reset. Please Login with your new password. If it is not you please contact administrator."
		}

		if (!req.body.password || !req.body.token) {
			return res.status(400).json({ errors: [{ msg: 'Token and password Required' }] });
		}
		//const user = await User.findOne({ 'password_reset_token.token': req.body.token });
		const user = await User.findOne({'password_reset_token.token': req.body.token });
		if (!user) {
			return res.status(400).json({ errors: [{ msg: 'Invalid Token' }] });
		}
		if (user.password_reset_token.expires < new Date()) {
			return res.status(400).json({ errors: [{ msg: 'Token has Expired' }] });
		}

		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(req.body.password, salt);
		user.password_reset_token.token = '';
		user.password_reset_token.expires = null;
		user.password_reset_token.reset_type = 'email';

		await user.save().then(async () => {
			await Email.sendEmail(user.email, body);
			return res.status(200).json({
				message: "Password updated successfully",
			});
		});
	} catch (error) {
		res.status(500).send('Server Error');
	}
})

module.exports = router;
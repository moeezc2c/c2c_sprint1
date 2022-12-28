const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Email = require('../../../middleware/sendEmail');
const Job = require('../../../models/JobPosting/Job');

// @route   POST api/jobs
// @desc    Create a job
// @access  Public
router.post('/', [auth,
	[
		// check('expected_duration_id', 'Expected duration is required').not().isEmpty(),
		// check('complexity_id', 'Complexity is required').not().isEmpty(),
		// check('description', 'Description is required').not().isEmpty(),
		// check('main_skill_id', 'Main skill is required').not().isEmpty(),
		// check('payment_type_id', 'Payment type is required').not().isEmpty(),
		// check('payment_amount', 'payment type is required').not().isEmpty(),
	]
], async (req, res) => {
	// const errors = validationResult(req);

	// if (!errors.isEmpty()) {
	// 	return res.status(400).json({ errors: errors.array() });
	// }

	const {
		expected_duration_id,
		complexity_id,
		description,
		main_skill_id,
		payment_type_id,
		payment_amount,
		headline,
		location,
		attachments
	} = req.body;

	// Build job object
	const jobFields = {};
	jobFields.hire_manager_id = req.user.id;
	if (expected_duration_id) jobFields.expected_duration_id = expected_duration_id;
	if (complexity_id) jobFields.complexity_id = complexity_id;
	if (description) jobFields.description = description;
	if (attachments) jobFields.attachments = attachments;
	if (main_skill_id) jobFields.main_skill_id = main_skill_id;
	if (payment_type_id) jobFields.payment_type_id = payment_type_id;
	if (payment_amount) jobFields.payment_amount = payment_amount;
	if (headline) jobFields.headline = headline;
	if (location) jobFields.location = location;

	try {

		// create
		let job = new Job(jobFields);
		await job.save();
		return res.json(job);

	} catch (err) {
		
		res.status(500).send('Server Error');
	}

});

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Private
router.get('/getPendingJobs', auth, async (req, res) => {
	try {
		const jobs = await Job.find({ status: 'Pending' }).sort({ job_post_time: -1 }).populate('hire_manager_id');

		res.json(jobs);
	} catch (err) {
		res.status(500).send('Server Error');
	}
});

router.post('/updateStatus', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);
		if (user.type !== 'Admin') {
			return res.status(400).send('UnAuthorized Route');
		}
		const job = await Job.findById(req.body.job_id);
		job.status = req.body.status;
		let body = req.body.status === 'Rejected' ? ({
			title: "Job Posting Status",
			body: `<b>Hi Cyber To Cyber User </b></br><p>Your request for job pasoting has been rejected ${req.body.reason ? "for the following reasons: <br/>" + req.body.reason : "<br/> <p>Contact Admin for more detail</p>"}</p>`
		}) : ({
			title: "Job Posting Status",
			body: `<b>Hi Cyber To Cyber User </b></br><p>Your request for job pasoting has been Approved</p>`
		})
		await Email.sendEmail(req.body.email, body);
		await job.save();
		res.json(job);
	} catch (error) {
		res.status(500).send('Server Error');
	}
})

router.get('/', auth, async (req, res) => {
	try {
		const jobs = await Job.find({ hire_manager_id: req.user.id });
		res.json(jobs);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});

// @route   GET api/jobs
// @desc    Get all jobs
// @access  Private
router.get('/all', auth, async (req, res) => {
	try {
		const jobs = await Job.find({ status: 'Approved' });
		res.json(jobs);
	} catch (err) {
		
		res.status(500).send('Server Error');
	}
});

// @route   GET api/jobs/:id
// @desc    Get job by id
// @access  Private
router.get('/:id', auth, async (req, res) => {
	try {
		const job = await Job.findOne({ _id: req.params.id });;

		if (!job) {
			return res.status(400).json({ msg: 'Job not found' });
		}

		res.json(job);
	} catch (err) {
		

		if (err.kind === 'ObjectId') {
			return res.status(400).json({ msg: 'Job not found' });
		}

		res.status(500).send('Server Error');
	}
});

// @route   DELETE api/jobs/:id
// @desc    Delete a job
// @access  Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const job = await Job.findById(req.params.id);

		if (!job) {
			return res.status(400).json({ msg: 'Job not found' });
		}

		// Check user
		if (job.hire_manager_id.toString() !== req.user.id) {
			return res.status(401).json({ msg: 'User not authorized' });
		}

		await job.remove();

		res.json({ msg: 'Job removed' });
	} catch (err) {
		

		if (err.kind === 'ObjectId') {
			return res.status(400).json({ msg: 'job not found' });
		}

		res.status(500).send('Server Error');
	}
});

module.exports = router;
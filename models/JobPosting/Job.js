const mongoose = require('mongoose');

const attachmentsSchema = new mongoose.Schema({
    file_name: {
        type: String,
        required: true,
    },
    file_type: {
        type: String,
        required: true,
    },
    file_url: {
        type: String,
        required: true,
    }
})

const JobSchema = new mongoose.Schema({
    hire_manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    expected_duration_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expectedDuration'
    },
    complexity_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'complexity'
    },
    description: {
        type: String
    },
    main_skill_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'skill'
    },
    payment_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'paymentType'
    },
    payment_amount: {
        type: Number
    },
    headline: {
        type: String,
        required: true,
    },
    job_post_time: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: String,
        default: 'Pending',
        enum: ["Pending", "Approved", "Rejected"]
    },
    job_progress: {
        type: String,
        default: 'Not Started',
        enum: ["Not Started", "In Progress", "Completed"]
    },
    location: {
        type: String,
    },
    attachments:[attachmentsSchema]
})

module.exports = mongoose.model('job', JobSchema);

const mongoose = require('mongoose');

const ProposalSchema = new mongoose.Schema({
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job',
        required: true,
    },
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'freelancer',
        required: true,
    },
    
    hire_manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    proposal_date: {
        type: Date,
        default: Date.now()
    },
    proposal_time: {
        type: String,
        default: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()
    },
    payment_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'paymentType',
        required: true,
    },
    payment_amount: {
        type: Number,
        required: true,
    },
    current_proposal_status: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proposalStatusCatalog',
        required: true,
    },
    client_grade: {
        type: String
    },
    client_comment: {
        type: String,
    },
    user_name: {
       type: String,
        required: true,
    },
    freelancer_grade: {
        type: String,
    },
    freelancer_comment: {
        type: String,
    }
})

module.exports = mongoose.model('proposal', ProposalSchema);

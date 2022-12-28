const mongoose = require('mongoose');

const MilestoneSchema = new mongoose.Schema({
    milestone_name: {
        type: String,
    },
    milestone_description: {
        type: String,
    },
    milestone_start: {
        type: Date,
    },
    milestone_end: {
        type: Date,
    },
    milestone_status: {
        type: String,
        enum: ["Not Started", "In Progress", "Completed"],
    },
    milestone_percentage: {
        type: Number,
    },
    milestone_amount: {
        type: Number,
    }
})

const FixedContractSchema = new mongoose.Schema({
    fixed_price: {
        type: Number,
    },
    deposit_type: {
        type: String,
        enum: ["Milestone", "Complete"],
    },
    milestone: [MilestoneSchema],
    due_date: {
        type: Date,
    }
})

const HourlyContractSchema = new mongoose.Schema({
    hourly_rates: {
        type: Number,
        min: 0,
    },
    weekly_limits: {
        type: Boolean,
    },
    weekly_limit_rates: {
        type: Number,
    },
})

const ContractSchema = new mongoose.Schema({
    proposal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proposal',
        required: true,
    },
    hire_manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
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
    payment_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'paymentType',
        required: true,
    },
    contract_type: {
        type: String,
        enum: ["Fixed", "Hourly"],
        required: true,
    },
    fixed_contract: FixedContractSchema,
    hourly_contract: HourlyContractSchema,
    contract_status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected", "Completed", "Cancelled"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    }
})

ContractSchema.pre('find', function (next) {
    this.populate("proposal_id hire_manager_id job_id freelancer_id payment_type_id");
    next();
});

module.exports = mongoose.model('contract', ContractSchema);

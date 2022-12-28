const mongoose = require('mongoose');

const EmploymentSchema = new mongoose.Schema({
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company_name: {
        type: String,
        required: true
    },
    city: {
        type: String,
        requred: true,
    },
    country: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    from: {
        type: Date,
        required: true
    },
    to: {
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('employment', EmploymentSchema);

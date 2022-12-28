const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    certification_name: {
        type: String,
        required: true
    },
    provider: {
        type: String,
        requred: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    certification_link: {
        type: String,
    },
})

module.exports = mongoose.model('certification', CertificationSchema);

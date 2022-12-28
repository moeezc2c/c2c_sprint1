const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    suite: {
        type: String,
    },
    city: {
        type: String,
    },
    province: {
        type: String,
    },
    zip: {
        type: String
    }
})

module.exports = mongoose.model('location', LocationSchema);

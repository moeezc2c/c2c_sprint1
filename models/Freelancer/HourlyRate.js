const mongoose = require('mongoose');

const HourlyRateSchema = new mongoose.Schema({
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    hourly_rate: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('hourlyRate', HourlyRateSchema);

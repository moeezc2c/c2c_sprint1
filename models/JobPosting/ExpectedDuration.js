const mongoose = require('mongoose');

const ExpectedDurationSchema = new mongoose.Schema({
    duration_text: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('expectedDuration', ExpectedDurationSchema);

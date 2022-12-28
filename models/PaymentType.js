const mongoose = require('mongoose');

const PaymentType = new mongoose.Schema({
    type_name: {
        type: String,
        enum: ["Hourly", "Fixed", null],
        default: null,
        required: true
    }
})

module.exports = mongoose.model('paymentType', PaymentType);

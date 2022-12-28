const mongoose = require('mongoose');

const PhoneSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    codeBody: {
        type: String
    },
    verified: {
        type: String
    },
})

module.exports = mongoose.model('phone', PhoneSchema);

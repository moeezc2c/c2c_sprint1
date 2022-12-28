const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        requred: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["Freelancer", "Client","Admin"],
        default: "Freelancer",
        required: true,
    },
    date: {
        type: Date,
        default: Date.now()
    },
    approval: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
    },
    tfa_login: {
        type: Boolean,
        default: false
    },
    tfa_otp:{
        type: Number,
        default: null
    },
    tfa_otp_expiry:{
        type: Date,
        default: null
    },
    password_reset_token: {
        token: {
            type: String,
            default: ""
        },
        expires: {
            type: Date,
            default: null
        },
        reset_type: {
            type: String,
            enum: ["email", "phone"],
            default: "email"
        },
    }
})

module.exports = User = mongoose.model('user', userSchema);

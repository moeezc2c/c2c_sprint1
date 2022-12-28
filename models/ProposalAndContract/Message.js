const mongoose = require('mongoose');

const Message = new mongoose.Schema({
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    user_name: {
        type: String,
        required: true,
    },
    hire_manager_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
    message_date: {
        type: Date,
        default: Date.now(),
    },
    message_time: {
        type: String,
        default: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
    },
    message_text: {
        type: String,
    },
    message_type: {
        type: String,
        required: true,
        enum: ["text", "file"],
    },
    message_file_properties: {
        file_name: {
            type: String,
            default: "",
        },
        file_url: {
            type: String,
            default: "",
        },
        file_type: {
            type: String,
            default: "",
        },
    },
    read:{
        type: Boolean,
        default: false,
    },
    proposal_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proposal',
        required: true,
    },
    proposal_catalog_status_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'proposalStatusCatalog',
    }
})

module.exports = mongoose.model('message', Message);

const mongoose = require('mongoose');

const AttachmentSchema = new mongoose.Schema({
    message_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message',
        required: true,
    },
    attachment_link: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('attachment', AttachmentSchema);

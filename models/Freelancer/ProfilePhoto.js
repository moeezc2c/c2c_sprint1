const mongoose = require('mongoose');

const ProfilePhotoSchema = new mongoose.Schema({
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    photo_link: {
        type: String,
        required: true
    },
})

module.exports = mongoose.model('profilePhoto', ProfilePhotoSchema);

const mongoose = require('mongoose');

const ExpertiseSchema = new mongoose.Schema({
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    category: {
        type: String,
    },
    skills: {
        type: String,
    }
})

module.exports = mongoose.model('expertise', ExpertiseSchema);

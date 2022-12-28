const mongoose = require('mongoose');

const ExpertLevelSchema = new mongoose.Schema({
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    expert_level: {
        type: String,
        enum: ["Entry Level", "Intermediate", "Expert", null],
        default: null,
        required: true
    }
})

module.exports = mongoose.model('expertLevel', ExpertLevelSchema);

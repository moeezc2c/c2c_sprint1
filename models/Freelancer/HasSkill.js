const mongoose = require('mongoose');

const HasSkillSchema = new mongoose.Schema({
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    skill_id: {
        type: Array,
        default: [],
    },
})

module.exports = mongoose.model('hasSkill', HasSkillSchema);

const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    skill_name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('skills', SkillSchema);

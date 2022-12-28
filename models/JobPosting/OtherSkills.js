const mongoose = require('mongoose');

const OtherSkillsSchema = new mongoose.Schema({
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'job'
    },
    skill_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'skill'
    },
})

module.exports = mongoose.model('otherSkills', OtherSkillsSchema);

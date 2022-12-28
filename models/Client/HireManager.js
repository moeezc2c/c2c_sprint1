const mongoose = require('mongoose');

const HireManager = new mongoose.Schema({
    user_account_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company_id: {
        type: [String],
        default: null,
    },
    overview: {
        type: String
    },        
    skills_level_id: {
        type: [String]
    },
    experience_level: {
        type: String,
        enum: ["Entry Level", "Intermediate", "Expert", null],
        default: null,
    },
    location: {
        type: String,
    }    
})

module.exports = mongoose.model('hireManager', HireManager);

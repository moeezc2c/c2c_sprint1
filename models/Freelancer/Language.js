const mongoose = require('mongoose');

const LanguageSchema = new mongoose.Schema({
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    language: {
        type: String,
        enum: ["English", "Urdu", "Arabic", null],
        default: null,
        required: true
    },
    proficiency: {
        type: String,
        enum: ["Basic", "Conversational", "Fluent", "Native or Bilingual", null],
        default: null,
        required: true
    }
})

module.exports = mongoose.model('language', LanguageSchema);

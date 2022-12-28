const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    provider: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        required: true
      },
    to: {
        type: Date
    },
    current: {
        type: Boolean,
        default: false
    },
    degree: {
        type: String,
    },    
    specialization: {
        type: String,
    },
    description: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('education', EducationSchema);

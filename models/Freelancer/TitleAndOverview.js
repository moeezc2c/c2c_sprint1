const mongoose = require('mongoose');

const TitleAndOverviewSchema = new mongoose.Schema({
    freelancer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    professional_overview: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('titleAndOverview', TitleAndOverviewSchema);

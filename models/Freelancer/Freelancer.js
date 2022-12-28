const mongoose = require('mongoose');

const FreelancerSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    registration_date: {
        type: Date,
        default: Date.now()
    },
    certification: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'certification'
    },
    education: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'education'
    },
    employment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employment'
    },
    expertise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expertise'
    },
    expertLevel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'expertLevel'
    },
    hourlyRate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hourlyRate'
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'location'
    },
    phone: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'phone'
    },
    profilePhoto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'profilePhoto'
    },
    titleAndOverview: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'titleAndOverview'
    },
})

FreelancerSchema.pre('find', function (next) {
    this.populate("user_id certification education titleAndOverview profilePhoto phone location hourlyRate expertise expertLevel employment");
    next();
  });

  FreelancerSchema.pre('findOne', function (next) {
    this.populate("user_id certification education titleAndOverview profilePhoto phone location hourlyRate expertise expertLevel employment");
    next();
  });

module.exports = mongoose.model('freelancer', FreelancerSchema);

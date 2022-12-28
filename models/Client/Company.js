const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true,
    },
    company_location: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('company', CompanySchema);

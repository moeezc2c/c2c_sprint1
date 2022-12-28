const mongoose = require('mongoose');

const ProposalStatusCatalog = new mongoose.Schema({
    status_name: {
        type: String,
        required: true,
    },
})
module.exports = mongoose.model('proposalStatusCatalog', ProposalStatusCatalog);

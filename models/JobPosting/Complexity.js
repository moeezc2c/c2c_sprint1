const mongoose = require('mongoose');

const ComplexitySchema = new mongoose.Schema({
    complexity: {
        type: String,
        required: true,
    },
})

module.exports = mongoose.model('complexity', ComplexitySchema);

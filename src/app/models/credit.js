const mongoose = require('../../database/database')

const creditSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        min: 0,
        required: true
    }
})

const Credit = mongoose.model('credit', creditSchema);

module.exports = Credit;
const mongoose = require('../../database/database')

const debtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        min: 0,
        required: true
    },
    status: {
        type: String,
        required: false,
        uppercase: true,
        enum: ['PAGO', 'PENDENTE', 'AGENDADO']
    }
})

const Debt = mongoose.model('debt', debtSchema);

module.exports = Debt;
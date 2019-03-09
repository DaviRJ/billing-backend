const mongoose = require("../../database/database");

const billingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    month: {
        type: Number,
        min: 1,
        max: 12,
        required: true
    },
    yaer: {
        type: Number,
        min: 1960,
        max: 2999,
        required: true
    },
    credits: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "credit"
        }
    ],
    debts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "debt"
        }
    ],
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Billing = mongoose.model("billing", billingSchema);

module.exports = Billing;

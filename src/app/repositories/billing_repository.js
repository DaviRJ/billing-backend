const Billing = require("../models/billing");
const mongoose = require("../../database/database");

class BillingRepository {
    getList() {
        const promisseToReturn = new Promise((resolve, reject) => {
            try {
                const billings = Billing.find()
                    .populate("debts")
                    .populate("credits");

                resolve(billings);
            } catch (err) {
                reject(err);
            }
        });

        return promisseToReturn;
    }

    getOneById(id) {
        const promisseToReturn = new Promise((resolve, reject) => {
            try {
                const billing = Billing.findById(id)
                    .populate("debts")
                    .populate("credits");

                resolve(billing);
            } catch (err) {
                reject(err);
            }
        });

        return promisseToReturn;
    }
}

module.exports = new BillingRepository();

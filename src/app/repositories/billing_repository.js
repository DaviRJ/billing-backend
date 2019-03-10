const Billing = require("../models/billing");
const Debt = require("../models/debt");
const Credit = require("../models/credit");
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

    deleteOneById(id) {
        const promiseToReturn = new Promise((resolve, reject) => {
            try {
                Billing.findById(id, async (err, billing) => {
                    if (err) reject(err);

                    const { credits, debts } = billing;

                    if (credits) {
                        await Promise.all(
                            credits.map(async credit => {
                                await Credit.findByIdAndRemove(credit._id);
                            })
                        );
                    }

                    if (debts) {
                        await Promise.all(
                            debts.map(async debt => {
                                await Debt.findByIdAndRemove(debt._id);
                            })
                        );
                    }

                    billing.remove();
                });

                resolve(true);
            } catch (err) {
                reject(err);
            }
        });

        return promiseToReturn;
    }
}

module.exports = new BillingRepository();

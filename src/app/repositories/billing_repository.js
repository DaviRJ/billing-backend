const { isEmptyObject } = require("../utils/asp");
const Billing = require("../models/billing");
const Debt = require("../models/debt");
const Credit = require("../models/credit");

class BillingRepository {
    create(billing, credits = {}, debts = {}) {
        const promiseToReturn = new Promise(async (resolve, reject) => {
            try {
                const newBilling = await Billing.create(billing);

                if (!isEmptyObject(credits)) {
                    await Promise.all(
                        credits.map(async credit => {
                            try {
                                const createdCredit = await Credit.create(
                                    credit
                                );
                                newBilling.credits.push(createdCredit);
                            } catch (err) {
                                newBilling.remove();
                                reject(err);
                            }
                        })
                    );
                }

                if (!isEmptyObject(debts)) {
                    await Promise.all(
                        debts.map(async debt => {
                            try {
                                const createdDebt = await Debt.create(debt);
                                newBilling.debts.push(createdDebt);
                            } catch (err) {
                                newBilling.remove();
                                reject(err);
                            }
                        })
                    );
                }

                newBilling.save();

                resolve(newBilling);
            } catch (err) {
                reject(err);
            }
        });

        return promiseToReturn;
    }

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
                    .populate("credits")
                    .populate("debts");

                resolve(billing);
            } catch (err) {
                reject(err);
            }
        });

        return promisseToReturn;
    }

    updateById(id, params, opts = { new: true }) {
        const promiseToReturn = new Promise((resolve, reject) => {
            try {
                const updatedBilling = Billing.findOneAndUpdate(
                    id,
                    params,
                    opts
                )
                    .populate("credits")
                    .populate("debts");
                resolve(updatedBilling);
            } catch (err) {
                reject(err);
            }
        });

        return promiseToReturn;
    }

    deleteOneById(id) {
        const promiseToReturn = new Promise(async (resolve, reject) => {
            try {
                const billing = await Billing.findById(id);

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

                resolve(true);
            } catch (err) {
                reject(err);
            }
        });

        return promiseToReturn;
    }

    deleteAll() {
        const promiseToReturn = new Promise((resolve, reject) => {
            try {
                const query = Billing.deleteMany({});
                resolve(query);
            } catch (err) {
                reject(err);
            }
        });

        return promiseToReturn;
    }
}

module.exports = new BillingRepository();

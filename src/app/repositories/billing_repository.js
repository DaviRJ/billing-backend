const Billing = require("../models/billing");
const Debt = require("../models/debt");
const Credit = require("../models/credit");

function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

class BillingRepository {
    create(billing, credits = {}, debts = {}) {
        const promiseToReturn = new Promise(async (resolve, reject) => {
            try {
                const newBilling = await Billing.create(billing);

                if (!isEmptyObject(credits)) {
                    await Promise.all(
                        credits.map(async credit => {
                            const createdCredit = await Credit.create(credit);
                            newBilling.credits.push(createdCredit);
                        })
                    );
                }

                if (!isEmptyObject(debts)) {
                    await Promise.all(
                        debts.map(async debt => {
                            const createdDebt = await Debt.create(debt);
                            newBilling.debts.push(createdDebt);
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
}

module.exports = new BillingRepository();

const BillingRepository = require("../repositories/billing_repository");
const DebtRepository = require("../repositories/debt_repository");
const CreditRepository = require("../repositories/credit_repository");

class BillingService {
    create(params) {
        const { credits, debts, ...billing } = params;

        const promiseToReturn = new Promise((resolve, reject) => {
            BillingRepository.create(billing, credits, debts)
                .then(createdBilling => resolve(createdBilling))
                .catch(err => reject(err));
        });

        return promiseToReturn;
    }

    getList(opts) {
        const promiseToReturn = new Promise((resolve, reject) => {
            if (!opts.page || !opts.take) {
                opts = { page: 1, take: 50 };
            }

            BillingRepository.getList(opts)
                .then(billings => resolve(billings.docs))
                .catch(err => reject(err));
        });

        return promiseToReturn;
    }

    getOneById(id) {
        const promiseToReturn = new Promise((resolve, reject) => {
            BillingRepository.getOneById(id)
                .then(billing => resolve(billing))
                .catch(err => reject(err));
        });

        return promiseToReturn;
    }

    updateById(id, params) {
        const promisseToReturn = new Promise((resolve, reject) => {
            BillingRepository.updateById(id, params)
                .then(updatedBilling => resolve(updatedBilling))
                .catch(err => reject(err));
        });

        return promisseToReturn;
    }

    deleteOneById(id) {
        const promiseToReturn = new Promise((resolve, reject) => {
            BillingRepository.deleteOneById(id)
                .then(deleted => resolve(deleted))
                .catch(err => reject(err));
        });

        return promiseToReturn;
    }

    deleteAll() {
        const promiseToReturn = new Promise((resolve, reject) => {
            Promise.all([
                CreditRepository.deleteAll(),
                DebtRepository.deleteAll(),
                BillingRepository.deleteAll()
            ])
                .then(query => resolve(query))
                .catch(err => reject(err));
        });

        return promiseToReturn;
    }
}

module.exports = new BillingService();

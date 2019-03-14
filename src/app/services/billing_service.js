const BillingRepository = require("../repositories/billing_repository");
const DebtRepository = require("../repositories/debt_repository");
const CreditRepository = require("../repositories/credit_repository");

class BillingService {
    create(params) {
        const { name, year, month, credits, debts } = params;

        const billingParams = { name, year, month };

        const promiseToReturn = new Promise((resolve, reject) => {
            BillingRepository.create(billingParams, credits, debts)
                .then(createdBilling => resolve(createdBilling))
                .catch(err => reject(err));
        });

        return promiseToReturn;
    }

    getList() {
        const promiseToReturn = new Promise((resolve, reject) => {
            BillingRepository.getList()
                .then(billings => resolve(billings))
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

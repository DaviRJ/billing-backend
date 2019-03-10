const BillingRepository = require("../repositories/billing_repository");

class BillingService {
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
}

module.exports = new BillingService();

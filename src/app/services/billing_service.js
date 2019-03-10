const BillingRepository = require("../repositories/billing_repository");

class BillingService {
    getList() {
        const promiseToReturn = new Promise((resolve, reject) => {
            BillingRepository.getList()
                .then(data => resolve(data))
                .catch(err => reject(err));
        });

        return promiseToReturn;
    }
}

module.exports = new BillingService();

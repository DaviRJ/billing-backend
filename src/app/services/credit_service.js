const CreditRepository = require("../repositories/credit_repository");

class CreditService {
    deleteAll() {
        const promiseToReturn = new Promise((resolve, reject) => {
            CreditRepository.deleteAll()
                .then(query => resolve(query))
                .catch(err => reject(err));
        });

        return promiseToReturn;
    }
}

module.exports = new CreditService();

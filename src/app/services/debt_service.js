const DebtRepository = require("../repositories/debt_repository");

class DebtService {
    deleteAll() {
        const promiseToReturn = new Promise((resolve, reject) => {
            DebtRepository.deleteAll()
                .then(query => resolve(query))
                .catch(err => reject(err));
        });

        return promiseToReturn;
    }
}

module.exports = new DebtService();

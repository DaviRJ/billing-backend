const Debt = require("../models/debt");

class DebtRepository {
    deleteAll() {
        const promiseToReturn = new Promise((resolve, reject) => {
            try {
                const query = Debt.deleteMany({});
                resolve(query);
            } catch (err) {
                reject(err);
            }
        });

        return promiseToReturn;
    }
}

module.exports = new DebtRepository();

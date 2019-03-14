const Credits = require("../models/credit");

class CreditRepository {
    deleteAll() {
        const promiseToReturn = new Promise((resolve, reject) => {
            try {
                const query = Credits.deleteMany({});
                resolve(query);
            } catch (err) {
                reject(err);
            }
        });
        return promiseToReturn;
    }
}

module.exports = new CreditRepository();

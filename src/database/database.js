const mongoose = require("mongoose");
const database_url = process.env.DB_URL;

mongoose.connect(database_url, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});

mongoose.Promise = global.Promise;

module.exports = mongoose;

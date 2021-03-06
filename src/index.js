require("dotenv-flow").config();
const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Controllers
require("./app/controllers/billingController")(app);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;

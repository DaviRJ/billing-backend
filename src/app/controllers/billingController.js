const router = require("express").Router();
const Billing = require("../models/billing");
const Credit = require("../models/credit");
const Debt = require("../models/debt");

//Create
router.post("/", async (req, res) => {
    try {
        const { name, year, month, credits, debts } = req.body;

        const billing = await Billing.create({ name, year, month });

        //Percorrendo créditos para criação
        await Promise.all(
            credits.map(async credit => {
                const createdCredit = await Credit.create(credit);
                billing.credits.push(createdCredit);
            })
        );

        //Percorrendo débitos para criação
        await Promise.all(
            debts.map(async debt => {
                const createdDebt = await Debt.create(debt);
                billing.debts.push(createdDebt);
            })
        );

        //salvando pagamento com os novos creditos
        await billing.save();

        return res.status(200).send(billing);
    } catch (error) {
        return res
            .status(400)
            .send({ error: "Creation failed", message: error.message });
    }
});

//Read
router.get("/:id", async (req, res) => {
    const billingId = req.params.id;
    const billing = await Billing.findById(billingId)
        .populate("credits")
        .populate("debts");

    return res.status(200).send(billing);
});

//Update
router.put("/:id", async (req, res) => {
    if (!req.params.id) {
        return res
            .status(400)
            .send({ error: "Cant update", message: "id not provided" });
    }

    try {
        const billingId = req.params.id;

        const updatedBilling = await Billing.findByIdAndUpdate(
            billingId,
            req.body
        )
            .populate("credits")
            .populate("debts");

        return res.status(200).send(updatedBilling);
    } catch (err) {
        return res
            .status(400)
            .send({ error: "Cant update", message: "id not provided" });
    }
});

//List
router.get("/", async (req, res) => {
    const billings = await Billing.find()
        .populate("debts")
        .populate("credits");

    return res.status(200).send(billings);
});

module.exports = app => app.use("/billing", router);

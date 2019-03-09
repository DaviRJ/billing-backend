const router = require("express").Router();
const Billing = require("../models/billing");
const Credit = require("../models/credit");
const Debt = require("../models/debt");

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

router.get("/:id", async (req, res) => {
    const billing = await Billing.findById(billingId);

    return res.status(200).send(billing);
});

router.get("/", async (req, res) => {
    const billings = await Billing.find()
        .populate("debts")
        .populate("credits");

    return res.status(200).send(billings);
});

module.exports = app => app.use("/billing", router);

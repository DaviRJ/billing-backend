const router = require("express").Router();
const Billing = require("../models/billing");

router.post("/", async (req, res) => {
    try {
        const billing = Billing.create(req.body);
        return res.status(200).send(billing);
    } catch (error) {
        return res
            .send(400)
            .send({ error: "Creation failed", message: error.message });
    }
});

router.get("/:id", async (req, res) => {
    const billingId = req.param.id;

    if (!billing) {
        return res
            .status(400)
            .send({ error: "Search failed", message: "id not provided" });
    }

    const billing = await Billing.findById(billingId);

    return res.status(200).send(billing);
});

module.exports = app => app.use("/billing", router);

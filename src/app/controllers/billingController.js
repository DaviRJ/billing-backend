const router = require("express").Router();
const Billing = require("../models/billing");

const BillingService = require("../services/billing_service");

//Create
router.post("/", async (req, res) => {
    try {
        const billing = await BillingService.create(req.body);

        return res.status(200).send(billing);
    } catch (error) {
        return res
            .status(400)
            .send({ error: "Creation failed", message: error.message });
    }
});

//Read
router.get("/:id", async (req, res) => {
    try {
        const billing = await BillingService.getOneById(req.params.id);
        return res.status(200).send(billing || {});
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
});

//Update
router.put("/:id", async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ error: "id not provided" });
    }

    try {
        const updatedBilling = await BillingService.updateById(
            req.params.id,
            req.body
        );
        return res.status(200).send(updatedBilling);
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
});

//Delete
router.delete("/:id", async (req, res) => {
    if (!req.params.id) {
        return res.status(400).send({ error: "id not provided" });
    }

    try {
        const billingId = req.params.id;

        const success = await BillingService.deleteOneById(billingId);

        return res.status(200).send({ success });
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
});

router.delete("/delete/all", async (req, res) => {
    try {
        const query = BillingService.deleteAll();

        return res.status(200).send({ sucess: query });
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
});

//List
router.get("/", async (req, res) => {
    try {
        const billings = await BillingService.getList();
        return res.status(200).send(billings);
    } catch (err) {
        return res.status(400).send({ error: err.message });
    }
});

module.exports = app => app.use("/billing", router);

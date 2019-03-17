const supertest = require("supertest");
const chai = require("chai");
const app = require("../../src/index");
const request = supertest(app);
const expect = chai.expect;

//Services
const BillingService = require("../../src/app/services/billing_service");
//Mocks
const billing = require("../../mocks/billing");

//Variables for tests propurse
let createdBilling;
let billingList1;
let billingList2;

describe("Billings", () => {
    describe("/ POST", () => {
        before(async () => {
            await BillingService.deleteAll();
        });

        it("Should create a new billing", done => {
            request
                .post("/billing/")
                .send(billing)
                .end((err, res) => {
                    //Check status
                    expect(res.status).to.be.eql(200);

                    //Check properties of the response
                    expect(res.body).to.be.an("object");
                    expect(res.body).have.property("name");
                    expect(res.body).have.property("year");
                    expect(res.body).have.property("month");
                    expect(res.body).have.property("credits");
                    expect(res.body).have.property("debts");

                    //Check the Billing
                    expect(res.body.name).to.be.eql(billing.name);
                    expect(res.body.year).to.be.eql(billing.year);
                    expect(res.body.month).to.be.eql(billing.month);

                    //Check the Credits
                    expect(res.body.credits).to.be.an("array");
                    expect(res.body.credits[0].name).to.be.eql(
                        billing.credits[0].name
                    );
                    expect(res.body.credits[0].value).to.be.eql(
                        billing.credits[0].value
                    );

                    //Check the Debts
                    expect(res.body.debts).to.be.an("array");
                    expect(res.body.debts[0].name).to.be.eql(
                        billing.debts[0].name
                    );
                    expect(res.body.debts[0].value).to.be.eql(
                        billing.debts[0].value
                    );

                    createdBilling = res.body;

                    done(err);
                });
        });
    });

    describe("/:id GET ", () => {
        it("Should return the billing created before", done => {
            request.get(`/billing/${createdBilling._id}`).end((err, res) => {
                //Check the response
                expect(res.status).to.be.eql(200);
                expect(res.body).to.be.an("object");
                //Check the propertyes
                expect(res.body).have.property("_id");
                expect(res.body).have.property("name");
                expect(res.body).have.property("year");
                expect(res.body).have.property("month");
                expect(res.body).have.property("credits");
                expect(res.body).have.property("debts");
                //Check the values
                expect(res.body.name).to.be.eql(billing.name);
                expect(res.body.year).to.be.eql(billing.year);
                expect(res.body.month).to.be.eql(billing.month);

                done(err);
            });
        });
    });

    describe("/:id DELETE", () => {
        it("Should delete the created billing", done => {
            request.delete(`/billing/${createdBilling._id}`).end((err, res) => {
                expect(res.status).to.be.eql(200);

                if (err) {
                    done(err);
                }

                request
                    .get(`/billing/${createdBilling._id}`)
                    .end((err, res) => {
                        expect(res.body).to.be.an("object");
                        expect(res.body).to.be.empty;
                        done(err);
                    });
            });
        });
    });

    describe("/ GET", () => {
        before(async () => {
            await BillingService.deleteAll();

            //Setup first billing
            billingList1 = { ...billing };
            billingList1.name = "Teste movimento 1 Lista";
            //Creating first billing
            await BillingService.create(billingList1);

            //Setup second billing
            billingList2 = { ...billing };
            billingList2.name = "Teste movimento 2 Lista";
            //Creating second billing
            await BillingService.create(billingList2);
        });

        it("Should return a list of billings", done => {
            request.get("/billing/").end((err, res) => {
                //Check the response
                expect(res.status).be.eql(200);
                expect(res.body).be.an("array");

                //Check the propertyes
                expect(res.body.length).to.be.eql(2);

                const billing1 = { ...res.body[0] };
                const billing2 = { ...res.body[1] };

                expect(billing1).have.property("name");
                expect(billing2).have.property("name");
                expect(billing1).have.property("year");
                expect(billing2).have.property("year");
                expect(billing1).have.property("month");
                expect(billing2).have.property("month");
                expect(billing1).have.property("credits");
                expect(billing2).have.property("credits");
                expect(billing1).have.property("debts");
                expect(billing2).have.property("debts");
                expect(billing1).have.property("_id");
                expect(billing2).have.property("_id");

                //Check the values
                expect(billing1.name).to.be.eql(billingList1.name);
                expect(billing2.name).to.be.eql(billingList2.name);
                expect(billing1.year).to.be.eql(billingList1.year);
                expect(billing2.year).to.be.eql(billingList2.year);
                expect(billing1.month).to.be.eql(billingList1.month);
                expect(billing2.month).to.be.eql(billingList2.month);

                done(err);
            });
        });
    });
});

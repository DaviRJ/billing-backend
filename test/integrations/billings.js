const supertest = require("supertest");
const chai = require("chai");
const app = require("../../src/index");
const request = supertest(app);
const expect = chai.expect;

//Services
const BillingService = require("../../src/app/services/billing_service");
//Mocks
const billing = require("../../mocks/billing");
let createdBilling;

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

    describe("/ GET", () => {
        it("Should return a list of billings", done => {
            request.get("/billing/").end((err, res) => {
                expect(res.status).be.eql(200);
                expect(res.body).be.an("array");
                done(err);
            });
        });
    });
});

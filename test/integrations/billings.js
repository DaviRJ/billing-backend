const supertest = require("supertest");
const chai = require("chai");
const app = require("../../src/index");
const request = supertest(app);
const expect = chai.expect;

describe("Billings", () => {
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

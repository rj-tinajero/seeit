const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/";

describe("routes : about", () => {
    describe("GET /about", () => {
        it("should return 'About Us' in the body of the response", (done) => {
            request.get(base, (err, res, body) => {
                expect(body).toContain("About Us");
                done();
            });
        });
    });
});
const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test("GET request to /api/convert?input=10L", function(done) {
    chai
      .request(server)
      .get("/api/convert?input=10L")
      .end(function(err, res) {
        assert.equal(res.status, 200, "response status should be 200.");
        assert.equal(res.body.string, "10 Liters converts to 2.64172 gallons", "response body did not return as expected");
        done()
      });
  });
  test("GET request to /api/convert?input=32g", function(done) {
    chai
      .request(server)
      .get("/api/convert?input=32g")
      .end(function(err, res) {
        assert.equal(res.status, 200, "response status should be 200");
        assert.equal(res.text, "invalid unit", "response should be invalid unit");
        done();
      });
  });
  test("GET request to /api/convert?input=3/7.2/4kg", function(done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kg")
      .end(function(err, res) {
        assert.equal(res.status, 200, "response status should be 200");
        assert.equal(res.text, "invalid number", "response should be invalid number");
        done();
      });
  });
  test("GET request to /api/convert?input=3/7.2/4kilomegagram", function(done) {
    chai
      .request(server)
      .get("/api/convert?input=3/7.2/4kilomegagram")
      .end(function(err, res) {
        assert.equal(res.status, 200, "response status should be 200");
        assert.equal(res.text, "invalid number and unit", "response should be invalid number and unit");
        done();
      });
  });
  test("GET request to /api/convert?input=kg", function(done) {
    chai 
      .request(server)
      .get("/api/convert?input=kg")
      .end(function(err, res) {
        assert.equal(res.status, 200, "response status should be 200");
        assert.equal(res.body.string, "1 kilograms converts to 2.20462 pounds", "response body did not return as expected");
        done();
      });
  });
});

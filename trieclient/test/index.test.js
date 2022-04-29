const moxios = require("moxios");
const assert = require("chai").assert;
const expect = require("chai").expect;
const sinon = require("sinon");
const request = require("../request.js");

describe("put", () => {
  let logSpy;
  let errorSpy;

  beforeEach(() => {
    moxios.install();
    logSpy = sinon.spy(console, 'log');
    errorSpy = sinon.spy(console, 'error');
  });

  afterEach(() => {
    moxios.uninstall();
    console.log.restore();
    console.error.restore();
  });

  it("should connect to the right host", (done) => {
    request.putKeyword("hello");
    moxios.wait(() => {
      assert.isDefined(moxios.requests.mostRecent());
      done();
    });
  });

  it("should receive success status correctly", (done) => {
    request.putKeyword("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { succeeded: true }
      }).then(() => {
        expect(logSpy.called);
        expect(logSpy.args[0][0]).to.equal("Successfully added hello to trie");
        expect(errorSpy.notCalled);
        done();
      });
    });
  });

  it("should handle malformed response correctly", (done) => {
    request.putKeyword("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: [
          {}
        ]
      }).then(() => {
        expect(errorSpy.called);
        expect(errorSpy.args[0][0]).to.equal("Malformed response");
        expect(logSpy.notCalled);
        done();
      });
    });
  });
});
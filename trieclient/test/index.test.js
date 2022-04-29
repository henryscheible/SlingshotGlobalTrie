const moxios = require("moxios");
const assert = require("chai").assert;
const expect = require("chai").expect;
const sinon = require("sinon");
const client = require("../client.js");

describe("putKeyword", () => {

  beforeEach(() => {
    moxios.install();
    client.log = sinon.spy();
    client.error = sinon.spy();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should connect to the right host", (done) => {
    client.putKeyword("hello");
    moxios.wait(() => {
      assert.isDefined(moxios.requests.mostRecent());
      done();
    });
  });

  it("should receive success status correctly", (done) => {
    client.putKeyword("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { succeeded: true }
      }).then(() => {
        expect(client.log.called);
        expect(client.log.args[0][0]).to.equal("Successfully added hello to trie");
        expect(client.error.notCalled);
        done();
      });
    });
  });

  it("should handle malformed response correctly", (done) => {
    client.putKeyword("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {}
      }).then(() => {
        expect(client.error.args[0][0]).to.equal("Malformed response");
        expect(client.log.notCalled);
        done();
      });
    });
  });

  it("should handle error response correctly", (done) => {
    client.putKeyword("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {succeeded: false}
      }).then(() => {
        expect(client.error.called);
        expect(client.error.args[0][0]).to.equal("Request Failed");
        expect(client.log.notCalled);
        done();
      });
    });
  });

  it("should handle error codes correctly", (done) => {
    client.putKeyword("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {succeeded: false}
      }).then(() => {
        expect(client.error.called);
        expect(client.error.args[0][0]).to.equal("Could not connect to server");
        done();
        expect(client.log.notCalled);
      });
    });
  });
});

describe("getKeyword", () => {

  beforeEach(() => {
    moxios.install();
    client.log = sinon.spy();
    client.error = sinon.spy();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should connect to the right host", (done) => {
    client.getKeyword("hello");
    moxios.wait(() => {
      assert.isDefined(moxios.requests.mostRecent());
      done();
    });
  });

  it("should receive success status correctly", (done) => {
    client.getKeyword("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { result: true }
      }).then(() => {
        expect(client.log.called);
        expect(client.log.args[0][0]).to.equal(true);
        expect(client.error.notCalled);
        done();
      });
    });
  });

  it("should handle malformed response correctly", (done) => {
    client.getKeyword("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {}
      }).then(() => {
        expect(client.error.args[0][0]).to.equal("Malformed response");
        expect(client.log.notCalled);
        done();
      });
    });
  });

  it("should receive failure response correctly", (done) => {
    client.getKeyword("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {result: false}
      }).then(() => {
        expect(client.log.called);
        expect(client.log.args[0][0]).to.equal(false);
        expect(client.error.notCalled);
        done();
      });
    });
  });

  it("should handle error codes correctly", (done) => {
    client.getKeyword("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {result: false}
      }).then(() => {
        expect(client.error.called);
        expect(client.error.args[0][0]).to.equal("Could not connect to server");
        expect(client.log.notCalled);
        done();
      });
    });
  });
});

describe("getAutocomplete", () => {

  beforeEach(() => {
    moxios.install();
    client.log = sinon.spy();
    client.error = sinon.spy();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it("should connect to the right host", (done) => {
    client.getAutocomplete("hello");
    moxios.wait(() => {
      assert.isDefined(moxios.requests.mostRecent());
      done();
    });
  });

  it("should receive word list correctly", (done) => {
    client.getAutocomplete("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { suggestions: ["word1", "word2"] }
      }).then(() => {
        expect(client.log.called);
        expect(client.log.args[0][0]).to.equal("word1");
        expect(client.log.args[1][0]).to.equal("word2");
        expect(client.error.notCalled);
        done();
      });
    });
  });

  it("should handle malformed response correctly", (done) => {
    client.getAutocomplete("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {}
      }).then(() => {
        expect(client.error.args[0][0]).to.equal("Malformed response");
        expect(client.log.notCalled);
        done();
      });
    });
  });

  it("should receive empty response correctly", (done) => {
    client.getAutocomplete("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {suggestions: []}
      }).then(() => {
        expect(client.log.called);
        expect(client.log.args[0][0]).to.equal("No suggestions");
        expect(client.error.notCalled);
        done();
      });
    });
  });

  it("should handle error codes correctly", (done) => {
    client.getAutocomplete("hello");
    moxios.wait(() => {
      let request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: {}
      }).then(() => {
        expect(client.error.called);
        expect(client.error.args[0][0]).to.equal("Could not connect to server");
        expect(client.log.notCalled);
        done();
      });
    });
  });
});
const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
chai.should();
const index = require("../index.js");

chai.use(chaiHttp);

describe('list()', () => {
  const tests = [
    {arg: {isTerminal: false}, expected: []},
    {arg: {isTerminal: true}, expected: [""]},
    {
      arg:
        {
          isTerminal: true, a:
            {
              isTerminal: true
            }
        },
      expected: ["", "a"]
    },
    {
      arg:
        {
          isTerminal: false, a:
            {
              isTerminal: true
            }
        },
      expected: ["a"]
    },
    {
      arg:
        {
          isTerminal: false,
          a:
            {
              isTerminal: true
            },
          b:
            {
              isTerminal: true
            }
        },
      expected: ["a", "b"]
    },
    {
      arg:
        {
          isTerminal: false,
          a:
            {
              isTerminal: true
            },
          b:
            {
              isTerminal: true,
              c:
                {
                  isTerminal: true
                }
            }
        },
      expected: ["a", "b", "bc"]
    },
    {
      arg:
        {
          isTerminal: false,
          a:
            {
              isTerminal: true
            },
          b:
            {
              isTerminal: false,
              c:
                {
                  isTerminal: true
                }
            }
        },
      expected: ["a", "bc"]
    }
  ]

  tests.forEach(({arg, expected}) => {
    it (`correctly lists ${expected}`, () => {
      const res = index.list(arg);
      assert.typeOf(res, 'Array');
      assert.lengthOf(res, expected.length);
      res.every((a, i) => assert.equal(a, expected[i]));
    })
  })
});

// integration tests for sequences of commands
describe("global state", () => {

  beforeEach(() => {
    // return Trie to initial state.
    index.head = {
      isTerminal: false
    }
  });


  it("should add a keyword successfully", (done) => {
    chai.request(index.api)
      .put("/hello")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql({succeeded: true});
        done()
      });
  });

  it("should not find a keyword not added", (done) => {
    chai.request(index.api)
      .get("/hello")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql({result: false});
        done()
      })
  })

  it("should find a keyword previously added", (done) => {
    const requester = chai.request(index.api).keepOpen();
    Promise.all([
      requester.get("/hello"),
      requester.put("/hello"),
      requester.get("/hello")
    ]).then((responses) => {
      responses.forEach((res) => res.should.have.status(200));
      responses[0].body.should.be.eql({result: false});
      responses[2].body.should.be.eql({result: true});
      done()
    })
  });

  it("should add multiple keywords and find them correctly", (done) => {
    const requester = chai.request(index.api).keepOpen();
    Promise.all([
      requester.get("/hello"),
      requester.put("/hello"),
      requester.get("/goodbye"),
      requester.put("/goodbye"),
      requester.get("/hello"),
      requester.get("/goodbye"),
    ]).then((responses) => {
      responses.forEach((res) => res.should.have.status(200));
      responses[0].body.should.be.eql({result: false});
      responses[2].body.should.be.eql({result: false});
      responses[4].body.should.be.eql({result: true});
      responses[5].body.should.be.eql({result: true});
      done();
    })
  })
})

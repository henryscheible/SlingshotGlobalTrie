const assert = require("chai").assert;
const index = require("../index.js");

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
})

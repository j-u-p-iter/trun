const assert = require("assert");

describe("super test 5", () => {
  describe("by some condition", () => {
    describe("new describe", () => {
      it("works properly", () => {
        assert.equal(5, 4);
      });
    });

    describe("one more describe", () => {
      it("works properly", () => {
        assert.equal(5, 5);
      });
    });
  });
});

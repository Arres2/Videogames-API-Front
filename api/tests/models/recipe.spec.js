const { Recipe, conn } = require("../../src/db.js");
const { expect } = require("chai");

const payload = {
  id: "as2esda235323",
  name: null,
  description: "algo de polito",
  health_score: 99,
  instructions: "cocinalo",
  image: "image.jpg",
};

describe("Recipe model", () => {
  before(() =>
    conn.authenticate().catch((err) => {
      console.error("Unable to connect to the database:", err);
    })
  );
  describe("Validators", () => {
    beforeEach(() => Recipe.sync({ force: false }));
    describe("name", () => {
      it("should throw an error if name is null", (done) => {
        Recipe.create(payload)
          .then(() => done(new Error("It requires a valid name")))
          .catch((ev) => done(console.error(ev, "Invalid name")));
      });
      it("should work when its a valid name", () => {
        Recipe.create({ ...payload, name: "Pollito en brasa" });
      });
    });
  });
});

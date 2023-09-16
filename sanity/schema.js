const { product } = require("./schemas/product");
const { designs } = require("./schemas/designs");
const { cleaning } = require("./schemas/cleaning");

const schema = {
  types: [product, designs, cleaning]
};

module.exports = {
  schema
};

const { product } = require("./schemas/product");
const { designs } = require("./schemas/designs");

const schema = {
  types: [product, designs]
};

module.exports = {
  schema
};

const { product } = require("./schemas/product");
const { cleaning } = require("./schemas/cleaning");
const { order } = require("./schemas/order");

const schema = {
  types: [product, cleaning, order]
};

module.exports = {
  schema
};

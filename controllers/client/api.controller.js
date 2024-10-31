const productModel = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const product = await productModel.find({ deleted: "false" });
  res.json(product);
};

const productModel = require("../../models/product.model");
const searchHelper = require("../../helpers/search");
const productNewPriceHelper = require("../../helpers/productPriceNew");
module.exports.index = async (req, res) => {
  const keyword = req.query.keyword;
  const find = {
    deleted: false,
    status: "active",
    // title: keyword,
  };
  const searchStatus = searchHelper(req.query);
  if (searchStatus.regex) {
    find.title = searchStatus.regex;
  }
  const record = await productModel.find(find);
  const newrecord = productNewPriceHelper.newProducts(record);
  res.render("client/pages/search/index", {
    products: newrecord,
  });
};

const productModel = require("../../models/product.model");
const productNewPriceHelper = require("../../helpers/productPriceNew");
module.exports.index = async (req, res) => {
  const products = await productModel
    .find({
      deleted: false,
      status: "active",
      featured: "1",
    })
    .sort({ position: "desc" })
    .limit(5);
  const newProducts = await productModel
    .find({
      deleted: false,
      status: "active",
    })
    .sort({ position: "desc" })
    .limit(5);
  const newProduct = productNewPriceHelper.newProducts(products);
  const newProductnew = productNewPriceHelper.newProducts(newProducts);
  res.render("client/pages/homes/index", {
    title: "Đây là trang chủ",
    products: newProduct,
    newProducts: newProductnew,
  });
};

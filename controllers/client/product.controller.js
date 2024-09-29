const productModel = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const products = await productModel.find({
    status: "active",
    deleted: false,
  });
  const newProduct = products.map((product) => {
    product.priceNew = (
      (product.price * (100 - product.discountPercentage)) /
      100
    ).toFixed(0);
    return product;
  });
  // console.log(newProduct);
  res.render("client/pages/products/index", {
    title: "Đây là product",
    products: newProduct,
  });
};

module.exports.status = (req, res) => {
  res.render("client/pages/products/index", {
    title: "Đây là status",
  });
};

module.exports.detail = async (req, res) => {
  try {
    let find = {
      status: "active",
      deleted: false,
      slug: req.params.slug,
    };
    const products = await productModel.findOne(find);
    products.priceNew = (
      (products.price * (100 - products.discountPercentage)) /
      100
    ).toFixed(0);
    res.render("client/pages/products/detail", {
      title: products.title,
      product: products,
    });
  } catch (error) {
    res.redirect("/products");
  }
};

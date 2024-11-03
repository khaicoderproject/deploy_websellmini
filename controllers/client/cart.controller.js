const cartModel = require("../../models/cart.model");
const productModel = require("../../models/product.model");
const newPriceHelper = require("../../helpers/productPriceNew");
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await cartModel.findOne({ _id: cartId });
  const cartProducts = cart.products;
  let count = 0;
  if (cart.products.length > 0) {
    for (const item of cartProducts) {
      const productId = item.product_id;
      const productInfo = await productModel
        .findOne({ _id: productId })
        .select("title thumbnail slug price discountPercentage");
      productInfo.priceNew = newPriceHelper.newProduct(productInfo);
      item.productInfo = productInfo;
      item.totalPrice = productInfo.priceNew * item.quantity;
    }
  }
  cart.totalPrice = cart.products.reduce(
    (sum, item) => sum + item.totalPrice,
    0
  );

  // console.log(newPrice);
  res.render("client/pages/cart/index", {
    products: cartProducts,
    cartDetail: cart,
  });
};
module.exports.add = async (req, res) => {
  const id = req.params.id;
  const quantity = req.body.quantity;
  const cartId = req.cookies.cartId;
  const cart = await cartModel.findOne({ _id: cartId });
  // console.log(cart.products);
  const existsQuantity = cart.products.find((item) => item.product_id == id);
  // console.log(existsQuantity);
  if (existsQuantity) {
    const newExistsQuantity = existsQuantity.quantity + parseInt(quantity);
    await cartModel.updateOne(
      { _id: cartId, "products.product_id": id },
      {
        $set: { "products.$.quantity": newExistsQuantity },
      }
    );
  } else {
    const objectProducts = {
      product_id: id,
      quantity: quantity,
    };
    await cartModel.updateOne(
      { _id: cartId },
      {
        $push: { products: objectProducts },
      }
    );
  }
  res.redirect("back");
};

module.exports.delete = async (req, res) => {
  const cartId = req.cookies.cartId;
  const id = req.params.id;
  const cart = await cartModel.updateOne(
    { _id: cartId },
    { $pull: { products: { product_id: id } } },
    { new: true }
  );
  res.redirect("back");
};
module.exports.update = async (req, res) => {
  const cartId = req.cookies.cartId;
  const id = req.params.id;
  const quantity = req.params.quantity;
  await cartModel.updateOne(
    { _id: cartId, "products.product_id": id },
    {
      $set: { "products.$.quantity": quantity },
    }
  );
  res.redirect("back");
};

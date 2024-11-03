const productModel = require("../../models/product.model");
const cartModel = require("../../models/cart.model");
const newPriceHelper = require("../../helpers/productPriceNew");
const orderModel = require("../../models/order.model");
module.exports.index = async (req, res) => {
  const cartId = req.cookies.cartId;
  const cart = await cartModel.findOne({ _id: cartId });
  const cartProducts = cart.products;
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
  res.render("client/pages/order/index", {
    products: cartProducts,
    cartDetail: cart,
  });
};

module.exports.order = async (req, res) => {
  const cartId = req.cookies.cartId;
  const userInfo = req.body;
  const cart = await cartModel.findOne({ _id: cartId });
  const products = [];
  for (const item of cart.products) {
    const objectProduct = {
      product_id: item.product_id,
      price: 0,
      discountPercentage: 0,
      quantity: item.quantity,
    };
    const product = await productModel
      .findOne({ _id: item.product_id })
      .select("discountPercentage price");
    objectProduct.price = product.price;
    objectProduct.discountPercentage = product.discountPercentage;
    products.push(objectProduct);
  }
  orderInfo = {
    cart_id: cartId,
    userInfo: userInfo,
    products: products,
  };
  const order = new orderModel(orderInfo);
  await order.save();
  cart.products = [];
  await cart.save();
  res.redirect(`/checkout/success/${order.id}`);
};
module.exports.success = async (req, res) => {
  const orderId = req.params.orderId;
  const order = await orderModel.findOne({ _id: orderId });
  res.render("client/pages/order/success", {
    order: order,
  });
};

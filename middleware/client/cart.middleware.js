const cartModel = require("../../models/cart.model");

module.exports.cartId = async (req, res, next) => {
  //   console.log(req.cookie.cartId);
  if (!req.cookies.cartId) {
    const cart = new cartModel();
    await cart.save();
    const time = 1000 * 60 * 60 * 24 * 365;
    res.cookie("cartId", cart.id, {
      expires: new Date(Date.now() + time),
      httpOnly: true,
    });
    // console.log(cart);
  } else {
    const cartId = req.cookies.cartId;
    const cart = await cartModel.findOne({
      _id: cartId,
    });
    const totalQuantity = cart.products.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    res.locals.totalQuantity = totalQuantity;
  }
  next();
};

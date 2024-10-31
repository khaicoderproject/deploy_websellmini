const mongoose = require("mongoose");
const cartScheme = new mongoose.Schema(
  {
    user_id: String,
    products: [
      {
        product_id: String,
        quantity: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const cart = mongoose.model("cart", cartScheme, "carts");

module.exports = cart;

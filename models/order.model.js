const mongoose = require("mongoose");
const orderScheme = new mongoose.Schema(
  {
    // user_id: String,
    cart_id: String,
    userInfo: {
      fullName: String,
      phone: Number,
      address: String,
    },
    products: [
      {
        product_id: String,
        price: Number,
        discountPercentage: Number,
        quantity: Number,
      },
    ],
    deleted: {
      type: Boolean,
      default: "false",
    },
    deletedAt: Date,
  },
  {
    timestamps: true,
  }
);
const order = mongoose.model("order", orderScheme, "orders");

module.exports = order;

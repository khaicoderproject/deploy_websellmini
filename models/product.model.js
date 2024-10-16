const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productSchema = new mongoose.Schema(
  {
    title: String,
    category_id: {
      type: String,
      default: "",
    },
    description: String,
    price: Number,
    discountPercentage: Number,
    stock: Number,
    thumbnail: String,
    featured: String,
    status: String,
    position: Number,
    slug: { type: String, slug: "title", unique: true },
    createBy: {
      account_id: String,
      createAt: {
        type: Date,
        default: Date.now, //default k lay gia tri cap nhap, vi no lam thay doi(chi dung 1 lan duy nhat)
      },
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    // deletedAt: Date, //trong database k co cx dc
    // by: String,
    deletedBy: {
      account_id: String,
      deletedAt: Date,
    },
    updatedBy: [
      {
        account_id: String,
        updatedAt: Date,
      },
    ],
  }
  // {
  //   timestamps: true,
  // }
);
const product = mongoose.model("product", productSchema, "products");

module.exports = product;

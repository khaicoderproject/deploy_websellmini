const mongoose = require("mongoose");
const slug = require("mongoose-slug-updater");
mongoose.plugin(slug);
const productsCategorySchema = new mongoose.Schema(
  {
    title: String,
    parent_id: {
      type: String,
      default: "",
    },
    description: String,
    thumbnail: String,
    status: String,
    position: Number,
    slug: { type: String, slug: "title", unique: true },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: Date, //trong database k co cx dc
    by: String,
  },
  {
    timestamps: true,
  }
);
const productsCategory = mongoose.model(
  "productsCategory",
  productsCategorySchema,
  "products-category"
);

module.exports = productsCategory;

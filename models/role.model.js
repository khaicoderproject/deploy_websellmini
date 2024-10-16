const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    permissions: {
      type: Array,
      default: [],
    },
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
const role = mongoose.model("role", roleSchema, "role");

module.exports = role;

const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const userSchema = new mongoose.Schema(
  {
    fullName: String,
    email: String,
    password: String,
    tokenUser: {
      type: String,
      default: () => generate.generateRandomString(20),
    },
    phone: String,
    avatar: String,
    // status: String,
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
const user = mongoose.model("user", userSchema, "users");

module.exports = user;

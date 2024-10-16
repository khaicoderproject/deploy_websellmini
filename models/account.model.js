const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const accountSchema = new mongoose.Schema(
  {
    fullname: String,
    email: String,
    password: String,
    token: {
      type: String,
      default: generate.generateRandomString(20),
    },
    phone: String,
    avatar: String,
    role_id: String,
    status: String,
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
const account = mongoose.model("account", accountSchema, "account");

module.exports = account;

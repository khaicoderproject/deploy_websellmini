const mongoose = require("mongoose");
module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); //connect laf ten hafm
    console.log("Connect success!");
  } catch (error) {
    console.log("Connect error");
  }
};

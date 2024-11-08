const userModel = require("../../models/user.model");
module.exports.user = async (req, res, next) => {
  if (req.cookies.tokenUser) {
    const user = await userModel
      .findOne({ tokenUser: req.cookies.tokenUser })
      .select("-password"); //co the bo sung them deleted, status
    if (user) {
      res.locals.user = user;
    }
  }
  next();
};

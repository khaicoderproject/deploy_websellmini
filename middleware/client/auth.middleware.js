const userModel = require("../../models/user.model");
module.exports.requireAuth = async (req, res, next) => {
  if (!req.cookies.tokenUser) {
    res.redirect(`user/login`);
  } else {
    // console.log(req.cookies.token);
    const user = await userModel
      .findOne({ tokenUser: req.cookies.tokenUser })
      .select("-password ");
    res.locals.user = user;
    next();
  }
};

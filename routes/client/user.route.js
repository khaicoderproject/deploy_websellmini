const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/user.controller");
const authValidate = require("../../validate/client/auth.validate");
const authMiddleware = require("../../middleware/client/auth.middleware");
router.get("/login", controller.login);
router.post("/login", authValidate.login, controller.loginPost);
router.get("/register", controller.register);
router.post("/register", authValidate.register, controller.registerPost);
router.get("/logout", controller.logout);
router.get("/password/forgot", controller.forgotPassword);
router.post(
  "/password/forgot",
  authValidate.forgotPassword,
  controller.forgotPasswordPost
);
router.get("/password/otp", controller.otpPassword);
router.post("/password/otp", controller.otpPasswordPost);
router.get("/password/reset", controller.resetPassword);
router.post(
  "/password/reset",
  authValidate.resetPassword,
  controller.resetPasswordPost
);
router.get("/info", authMiddleware.requireAuth, controller.info);
module.exports = router;

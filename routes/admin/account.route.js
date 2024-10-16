const controllerAdmin = require("../../controllers/admin/account.controller");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const middleware = require("../../middleware/admin/product.middleware");
router.get("/", controllerAdmin.index);
router.get("/create", controllerAdmin.create);
router.post(
  "/create",
  upload.single("avatar"),
  middleware.uploadCloud,
  controllerAdmin.createPost
);
module.exports = router;

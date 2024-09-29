const controllerAdmin = require("../../controllers/admin/productsCategory.controller");
const express = require("express");
const router = express.Router();
const validate = require("../../validate/admin/product-category.validate");
const multer = require("multer");
const upload = multer();
const middlewareProduct = require("../../middleware/admin/product.middleware");
router.get("/", controllerAdmin.index);
router.get("/create", controllerAdmin.create);
router.get("/edit/:id", controllerAdmin.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"),
  middlewareProduct.uploadCloud,
  validate.createPost,
  controllerAdmin.editPatch
);
router.post(
  "/create",
  upload.single("thumbnail"),
  middlewareProduct.uploadCloud,
  validate.createPost,
  controllerAdmin.createPost
);
module.exports = router;

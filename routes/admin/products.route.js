const controllerAdmin = require("../../controllers/admin/products.controller");
const express = require("express");
const router = express.Router();
const multer = require("multer");
//cai nay danh cho local chu kphai server
// const uploadName = require("../../helpers/upload");
// const upload = multer({ storage: uploadName() });
const validate = require("../../validate/admin/products.validate");
const middlewareProduct = require("../../middleware/admin/product.middleware");
const upload = multer();

router.get("/", controllerAdmin.product);
router.patch("/change-status/:status/:id", controllerAdmin.changeStatus);
router.patch("/change-multi", controllerAdmin.changeMulti);
router.delete("/delete-status/:id", controllerAdmin.deleteStatus);
router.get("/create", controllerAdmin.create);
//import validate and upload cloud
router.post(
  "/create",
  upload.single("thumbnail"),
  middlewareProduct.uploadCloud,
  validate.createPost, //trung gian middleware, check r mới tới controller tiếp theo
  controllerAdmin.createPost
);
router.get("/edit/:id", controllerAdmin.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"), //có file cần sử dụng multer vì bodyparse không nhận dc file
  middlewareProduct.uploadCloud,
  validate.createPost,
  controllerAdmin.editUpdate
);
router.get("/detail/:id", controllerAdmin.detail);

module.exports = router;

const controllerAdmin = require("../../controllers/admin/products.controller");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const uploadName = require("../../helpers/upload");
const validate = require("../../validate/admin/products.validate");
const upload = multer({ storage: uploadName() });

router.get("/", controllerAdmin.product);
router.patch("/change-status/:status/:id", controllerAdmin.changeStatus);
router.patch("/change-multi", controllerAdmin.changeMulti);
router.delete("/delete-status/:id", controllerAdmin.deleteStatus);
router.get("/create", controllerAdmin.create);
//import validate
router.post(
  "/create",
  upload.single("thumbnail"),
  validate.createPost, //trung gian middleware, check r mới tới controller tiếp theo
  controllerAdmin.createPost
);
router.get("/edit/:id", controllerAdmin.edit);
router.patch(
  "/edit/:id",
  upload.single("thumbnail"), //có file cần sử dụng multer vì bodyparse không nhận dc file
  controllerAdmin.editUpdate
);
router.get("/detail/:id", controllerAdmin.detail);

module.exports = router;

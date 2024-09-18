const controllerAdmin = require("../../controllers/admin/products.controller");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const streamifier = require("streamifier");
const uploadName = require("../../helpers/upload");
// const upload = multer({ storage: uploadName() }); //cai nay danh cho local chu kphai server
const validate = require("../../validate/admin/products.validate");
const upload = multer();

router.get("/", controllerAdmin.product);
router.patch("/change-status/:status/:id", controllerAdmin.changeStatus);
router.patch("/change-multi", controllerAdmin.changeMulti);
router.delete("/delete-status/:id", controllerAdmin.deleteStatus);
router.get("/create", controllerAdmin.create);
//import validate
router.post(
  "/create",
  upload.single("thumbnail"),
  function (req, res, next) {
    if (req.file) {
      let streamUpload = (req) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream((error, result) => {
            if (result) {
              resolve(result);
            } else {
              reject(error);
            }
          });

          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });
      };

      async function upload(req) {
        let result = await streamUpload(req);
        console.log(result);
        upload(req);
        next();
      }
    } else {
      next();
    }
  },
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

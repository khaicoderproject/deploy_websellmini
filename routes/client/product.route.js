const express = require("express");
const router = express.Router();
const controller = require("../../controllers/client/product.controller");
router.get("/", controller.index);
router.get("/status", controller.status);
router.get("/detail/:slug", controller.detail);
router.get("/:slugCategory", controller.categorySlug);
module.exports = router;

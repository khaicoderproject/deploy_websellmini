const express = require("express");
const router = express.Router();
const controllerAdmin = require("../../controllers/admin/my-account.controller");
router.get("/", controllerAdmin.index);
router.get("/edit", controllerAdmin.edit);
module.exports = router;

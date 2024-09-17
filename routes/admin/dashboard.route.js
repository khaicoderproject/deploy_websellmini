const controllerAdmin = require("../../controllers/admin/dashboard.controller");

const express = require("express");
const router = express.Router();
router.get("/", controllerAdmin.dashboard);

module.exports = router;

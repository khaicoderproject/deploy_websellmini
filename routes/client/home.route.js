const controller = require("../../controllers/client/home.controller");

const express = require("express");
const router = express.Router();
router.get("/", controller.index);

module.exports = router;

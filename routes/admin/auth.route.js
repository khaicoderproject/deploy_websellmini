const express = require("express");
const router = express.Router();
const controllerAdmin = require("../../controllers/admin/auth.controller");
router.get("/login", controllerAdmin.login);
router.post("/login", controllerAdmin.loginPost);
router.get("/logout", controllerAdmin.logout);
module.exports = router;

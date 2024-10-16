const controllerAdmin = require("../../controllers/admin/role.controller");
const express = require("express");
const router = express.Router();

router.get("/", controllerAdmin.index);
router.get("/create", controllerAdmin.create);
router.post("/create", controllerAdmin.createPost);
router.get("/edit/:id", controllerAdmin.edit);
router.patch("/edit/:id", controllerAdmin.editPatch);
router.get("/permissions", controllerAdmin.permissions);
router.patch("/permissions", controllerAdmin.permissionsPatch);
module.exports = router;

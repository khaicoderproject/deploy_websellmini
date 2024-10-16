const roleModel = require("../../models/role.model");
const systemConfig = require("../../config/system");
const role = require("../../models/role.model");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };
  const record = await roleModel.find(find);
  res.render("admin/pages/role/index.pug", {
    title: "Trang nhóm quyền",
    records: record,
  });
};

module.exports.create = async (req, res) => {
  res.render("admin/pages/role/create", {
    title: "Trang tạo nhóm quyền",
  });
};
//nếu console.log req.body không ra có thể do enctype của form(multer hoặc maybe body parse)
module.exports.createPost = async (req, res) => {
  //   console.log(req.body);
  const record = new roleModel(req.body);
  //   console.log(record);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/role`);
};

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const records = await roleModel.findOne({ _id: id }, { deleted: false });
  // console.log(records);
  res.render("admin/pages/role/edit", {
    title: "Chỉnh sửa nhóm quyền",
    records: records,
  });
};
module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  // console.log(req.body);
  await roleModel.updateOne({ _id: id }, req.body);
  res.redirect("back");
};
module.exports.permissions = async (req, res) => {
  let find = {
    deleted: false,
  };
  const records = await roleModel.find(find);
  res.render("admin/pages/role/permissions", {
    title: "Trang Phân Quyền",
    records: records,
  });
};
module.exports.permissionsPatch = async (req, res) => {
  const permissions = JSON.parse(req.body.permissions); // json parse để convert json sang js, stringify thì ngược lại.
  console.log(permissions);
  //cach1
  // permissions.forEach(async (item, index) => {
  //   await roleModel.updateOne(
  //     { _id: item.id },
  //     { permissions: item.permissions }
  //   );
  // });
  //cach2
  for (const item of permissions) {
    await roleModel.updateOne(
      { _id: item.id },
      { permissions: item.permissions }
    );
  }
  res.redirect("back");
};

const accountModel = require("../../models/account.model");
const roleModel = require("../../models/role.model");
const md5 = require("md5");
module.exports.index = async (req, res) => {
  const record = await accountModel
    .find({ deleted: false })
    .select("-password -token");
  //thêm select tăng độ bảo mật, không truyền token và password
  res.render("admin/pages/accounts/index", {
    records: record,
  });
};
module.exports.create = async (req, res) => {
  const recordRoles = await roleModel.find({ deleted: false });
  res.render("admin/pages/accounts/create", {
    title: "Tạo mới tài khoản",
    recordRoles: recordRoles,
  });
};
module.exports.createPost = async (req, res) => {
  req.body.password = md5(req.body.password);
  const records = new accountModel(req.body);
  await records.save();
  res.send("OK");
};

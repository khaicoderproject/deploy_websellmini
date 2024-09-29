const productCategoryModel = require("../../models/product-category.model");
const systemConfig = require("../../config/system");
const treeHelper = require("../../helpers/tree");
module.exports.index = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await productCategoryModel.find(find);
  const newRecords = await treeHelper.tree(records);
  console.log(newRecords);
  res.render("admin/pages/products-category/index", {
    title: "Trang danh mục sản phẩm",
    productCategory: newRecords,
  });
};
module.exports.create = async (req, res) => {
  let find = {
    deleted: false,
  };

  const records = await productCategoryModel.find(find);
  const newRecords = await treeHelper.tree(records);
  // console.log(newRecords);
  res.render("admin/pages/products-category/create", {
    title: "Trang tạo danh mục",
    records: newRecords,
  });
};
module.exports.createPost = async (req, res) => {
  if (req.body.position == "") {
    const countProduct = await productCategoryModel.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  // console.log(req.body);
  // if (req.file) {
  //   req.body.thumbnail = `/uploads/${req.file.filename}`; //k can localhost:3000 vi neu up len se de ten domain khac
  // }
  const record = new productCategoryModel(req.body);
  await record.save();
  res.redirect(`${systemConfig.prefixAdmin}/products-category`);
};

module.exports.edit = async (req, res) => {
  const id = req.params.id;
  const data = await productCategoryModel.findOne({
    _id: id,
    deleted: false,
  });
  const records = await productCategoryModel.find({
    deleted: false,
  });
  const newRecords = await treeHelper.tree(records);

  // console.log(records);
  res.render("admin/pages/products-category/edit", {
    title: "Trang chỉnh sửa danh mục",
    data: data,
    records: newRecords,
  });
};

module.exports.editPatch = async (req, res) => {
  const id = req.params.id;
  // console.log(req.body);
  const records = await productCategoryModel.updateMany({ _id: id }, req.body);
  res.redirect("back");
};

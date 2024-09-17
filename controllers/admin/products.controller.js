// [GET] /admin/products
const productModel = require("../../models/product.model");
const filterButton = require("../../helpers/filterButton");
const searchForm = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");

module.exports.product = async (req, res) => {
  const filterStatus = filterButton(req.query);

  // console.log(filterStatus);
  let find = {
    deleted: false,
  };
  if (req.query.status) {
    find.status = req.query.status;
    // console.log(find.status);
  }
  const searchStatus = searchForm(req.query);
  if (searchStatus.regex) {
    find.title = searchStatus.regex;
  }
  // console.log(req);

  //pagination
  const countPage = await productModel.countDocuments(find);
  let objectPagination = paginationHelper(
    {
      currentPage: 1,
      limit: 5,
    },
    req.query,
    countPage
  );

  const products = await productModel
    .find(find)
    .sort({ position: "desc" })
    .limit(objectPagination.limit)
    .skip(objectPagination.skipPage);
  // console.log(products);
  res.render("admin/pages/products/index", {
    title: "Trang sản phẩm Admin",
    products: products,
    filterStatus: filterStatus,
    keyword: searchStatus.keyword,
    pagination: objectPagination,
  });
};

module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;
  await productModel.updateOne({ _id: id }, { status: status });
  req.flash("success", "Cập nhập trạng thái thành công!");
  res.redirect("back");
};

module.exports.changeMulti = async (req, res) => {
  const type = req.body.type;
  const ids = req.body.ids.split(", ");
  console.log(type);
  console.log(ids);
  switch (type) {
    case "active":
      await productModel.updateMany(
        { _id: { $in: ids } },
        { status: "active" }
      );
      break;
    case "inactive":
      await productModel.updateMany(
        { _id: { $in: ids } },
        { status: "inactive" }
      );
      break;

    case "delete":
      await productModel.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);
        await productModel.updateMany({ _id: id }, { position: position });
      }
      break;
  }
  res.redirect("back");
};
//xoa tam thoi (co the dung path, vi day la chinh sua. Nhung nen dung delete)
module.exports.deleteStatus = async (req, res) => {
  const id = req.params.id;
  await productModel.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(), //them thoi gian xoa(luu y phai cap nhap trong mongoose)
      by: "hehe",
    }
  );
  res.redirect("back");
};
// //xoa vinh vien(trong dtb)
// module.exports.deleteStatus = async (req, res) => {
//   const id = req.params.id;
//   await productModel.deleteOne({ _id: id });
//   res.redirect("back");
// };
module.exports.create = async (req, res) => {
  res.render("admin/pages/products/create.pug");
};
module.exports.createPost = async (req, res) => {
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.stock);
  if (req.body.position == "") {
    const countProduct = await productModel.countDocuments();
    req.body.position = countProduct + 1;
  } else {
    req.body.position = parseInt(req.body.position);
  }
  // console.log(req.body);
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`; //k can localhost:3000 vi neu up len se de ten domain khac
  }
  const product = new productModel(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
  //đoạn này cần tối ưu
};
//edit
module.exports.edit = async (req, res) => {
  try {
    let find = {
      deleted: false,
      _id: req.params.id,
    };
    const products = await productModel.findOne(find);
    res.render("admin/pages/products/edit", {
      title: "Trang chỉnh sửa",
      product: products,
    });
  } catch (error) {
    req.flash("error", "Sản phẩm không hợp lệ!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

//edit update [patch]
module.exports.editUpdate = async (req, res) => {
  const id = req.params.id;
  req.body.price = parseInt(req.body.price);
  req.body.discountPercentage = parseInt(req.body.discountPercentage);
  req.body.stock = parseInt(req.body.price);
  req.body.position = parseInt(req.body.position);
  if (req.file) {
    req.body.thumbnail = `/uploads/${req.file.filename}`;
  }
  try {
    await productModel.updateOne({ _id: id }, req.body);
    req.flash("success", "Cập nhập thành công!");
  } catch (error) {
    req.flash("error", "Cập nhập thất bại!");
  }
  res.redirect("back");
};
module.exports.detail = async (req, res) => {
  try {
    let find = {
      deleted: false,
      _id: req.params.id,
    };
    const products = await productModel.findOne(find);
    // console.log(products);
    res.render("admin/pages/products/detail", {
      title: products.title,
      product: products,
    });
  } catch (error) {
    req.flash("error", "Sản phẩm không hợp lệ!");
    res.redirect(`${systemConfig.prefixAdmin}/products`);
  }
};

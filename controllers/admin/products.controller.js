// [GET] /admin/products
const productModel = require("../../models/product.model");
const filterButton = require("../../helpers/filterButton");
const searchForm = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");
const systemConfig = require("../../config/system");
const treeHelper = require("../../helpers/tree");
const productCategoryModel = require("../../models/product-category.model");
const accountModel = require("../../models/account.model");

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

  //sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    // console.log(req.query.sortValue);
    // console.log(req.query.sortKey);
    sort[req.query.sortKey] = req.query.sortValue;
  }
  sort.position = "desc";

  const products = await productModel
    .find(find)
    .sort(sort)
    .limit(objectPagination.limit)
    .skip(objectPagination.skipPage);
  //limit va skip co tac dung dieu huog pagination
  // console.log(products);

  // day la cach tu lam
  // for (const product of products) {
  //   if (product.createBy.account_id === res.locals.user.id) {
  //     product.accountFullName = res.locals.user.fullname;
  //   }
  // }

  //cach dung voi video
  for (const product of products) {
    //(danh cho lay thong tin nguoi dang san pham)
    const user = await accountModel.findOne({
      _id: product.createBy.account_id,
    });
    if (user) {
      product.accountFullName = user.fullname;
    }
    // danh cho lay thong tin nguoi chinh sua san pham
    // const updatedBy = product.updatedBy[product.updatedBy.length - 1];
    const updatedBy = product.updatedBy.slice(-1)[0]; //co the su dung cai nay thay vi length
    if (updatedBy) {
      const userUpdated = await accountModel.findOne({
        _id: updatedBy.account_id,
      });
      // product.accountFullNameUpdate = userUpdated.fullname; cach 1
      // cach 2
      updatedBy.accountFullName = userUpdated.fullname;
    }
  }

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
        {
          deleted: true,
          deletedBy: {
            account_id: res.locals.user.id,
            deletedAt: new Date(),
          },
        }
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
      // deletedAt: new Date(), //them thoi gian xoa(luu y phai cap nhap trong mongoose)
      // by: "hehe",
      deletedBy: {
        account_id: res.locals.user.id,
        deletedAt: new Date(),
      },
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
  const category = await productCategoryModel.find({
    deleted: false,
  });
  const newCategory = await treeHelper.tree(category);
  // console.log(newCategory);
  res.render("admin/pages/products/create.pug", {
    category: newCategory,
  });
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
  // if (req.file) {
  //   req.body.thumbnail = `/uploads/${req.file.filename}`; //k can localhost:3000 vi neu up len se de ten domain khac
  // }
  req.body.createBy = {
    account_id: res.locals.user.id,
  };
  const product = new productModel(req.body);
  await product.save();
  res.redirect(`${systemConfig.prefixAdmin}/products`);
  // res.redirect("back");
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
  // if (req.file) {
  //   req.body.thumbnail = `/uploads/${req.file.filename}`;
  // }
  try {
    const updatedBy = {
      account_id: res.locals.user.id,
      updatedAt: new Date(),
    };
    // req.body.updatedBy = updatedBy; dung phuong phap nay se chi luu duoc 1 object cuoi
    // vi the nen su dung push, va dung phuong thuc spread gui len object
    await productModel.updateOne(
      { _id: id },
      {
        ...req.body,
        $push: { updatedBy: updatedBy },
      } // object 2 nay cap nhap
    );
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

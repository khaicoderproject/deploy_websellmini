const productModel = require("../../models/product.model");
const productCategoryModel = require("../../models/product-category.model");
const productNewPriceHelper = require("../../helpers/productPriceNew");
const productPriceNewHelper = require("../../helpers/productPriceNew");
const product = require("../../models/product.model");
module.exports.index = async (req, res) => {
  const products = await productModel.find({
    status: "active",
    deleted: false,
  });

  const newProduct = productNewPriceHelper.newProduct(products);
  // console.log(newProduct);
  res.render("client/pages/products/index", {
    title: "Đây là product",
    products: newProduct,
  });
};

module.exports.status = (req, res) => {
  res.render("client/pages/products/index", {
    title: "Đây là status",
  });
};

module.exports.detail = async (req, res) => {
  try {
    let find = {
      status: "active",
      deleted: false,
      slug: req.params.slug,
    };
    const products = await productModel.findOne(find);
    products.priceNew = (
      (products.price * (100 - products.discountPercentage)) /
      100
    ).toFixed(0);
    if (products.category_id) {
      const recordCategory = await productCategoryModel.findOne({
        _id: products.category_id,
        deleted: false,
        status: "active",
      });
      products.category = recordCategory;
    }
    res.render("client/pages/products/detail", {
      title: products.title,
      product: products,
    });
  } catch (error) {
    res.redirect("/products");
  }
};

module.exports.categorySlug = async (req, res) => {
  const slug = req.params.slugCategory;
  const recordCategory = await productCategoryModel.findOne({
    slug: slug,
    deleted: false,
  });
  const getSubCategory = async (parentId) => {
    const subs = await productCategoryModel.find({
      parent_id: parentId,
      status: "active",
      deleted: false,
    });

    let allSub = [...subs];

    for (const sub of subs) {
      const childs = await getSubCategory(sub.id);
      allSub = allSub.concat(childs);
    }

    return allSub;
  };

  const listSubCategory = await getSubCategory(recordCategory.id);

  const listSubCategoryId = listSubCategory.map((item) => item.id);

  const record = await productModel.find({
    deleted: false,
    category_id: { $in: [recordCategory.id, ...listSubCategoryId] },
  });
  const newRecords = productPriceNewHelper.newProduct(record);
  res.render("client/pages/products/index", {
    title: `Sản phẩm ${recordCategory.title}`,
    products: newRecords,
  });
};

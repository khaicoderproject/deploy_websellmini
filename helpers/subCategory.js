const productCategoryModel = require("../models/product-category.model");
module.exports.getSubCategory = async (parent_id) => {
  const getCategory = async (parentId) => {
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
  const result = await getCategory(parent_id);
  return result;
};

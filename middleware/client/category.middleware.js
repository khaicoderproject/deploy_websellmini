const productCategoryModel = require("../../models/product-category.model");
const treeHelper = require("../../helpers/tree");
module.exports.category = async (req, res, next) => {
  const records = await productCategoryModel.find({
    deleted: false,
  });
  const newRecords = await treeHelper.tree(records);
  res.locals.layoutCategory = newRecords;
  next();
};

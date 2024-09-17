const productModel = require("../models/product.model");
module.exports = (objectPagination, query, count) => {
  if (query.page) {
    objectPagination.currentPage = query.page;
  }
  objectPagination.skipPage =
    (objectPagination.currentPage - 1) * objectPagination.limit;
  // console.log(totalPage);
  //mongoose mới k hỗ trợ count
  const totalPage = Math.ceil(count / objectPagination.limit);
  objectPagination.total = totalPage;
  // console.log(objectPagination.total);
  return objectPagination;
};

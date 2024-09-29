const dashboardRouter = require("./dashboard.route");
const systemConfig = require("../../config/system");
const productsRouter = require("./products.route");
const categoryRouter = require("./product-category");
module.exports = (app) => {
  // const PATH_ADMIN = "/admin"; //sẽ để file này trong config để tái sdung
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
  app.use(PATH_ADMIN + "/products", productsRouter);
  app.use(PATH_ADMIN + "/products-category", categoryRouter);
};

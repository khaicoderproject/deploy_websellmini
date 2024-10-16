const dashboardRouter = require("./dashboard.route");
const systemConfig = require("../../config/system");
const productsRouter = require("./products.route");
const categoryRouter = require("./product-category");
const roleRouter = require("./role.route");
const accountRouter = require("./account.route");
const authRouter = require("./auth.route");
const myAccountRouter = require("./my-account.route");
const authMiddleware = require("../../middleware/admin/auth.middleware"); // them auth de check xem co token chua
module.exports = (app) => {
  // const PATH_ADMIN = "/admin"; //sẽ để file này trong config để tái sdung
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(
    PATH_ADMIN + "/dashboard",
    authMiddleware.requireAuth,
    dashboardRouter
  );
  app.use(PATH_ADMIN + "/products", authMiddleware.requireAuth, productsRouter);
  app.use(
    PATH_ADMIN + "/products-category",
    authMiddleware.requireAuth,
    categoryRouter
  );
  app.use(PATH_ADMIN + "/role", authMiddleware.requireAuth, roleRouter);
  app.use(PATH_ADMIN + "/accounts", authMiddleware.requireAuth, accountRouter);
  app.use(PATH_ADMIN + "/auth", authRouter);
  app.use(
    PATH_ADMIN + "/my-account",
    authMiddleware.requireAuth,
    myAccountRouter
  );
};

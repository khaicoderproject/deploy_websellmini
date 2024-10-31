const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const categoryMiddleware = require("../../middleware/client/category.middleware");
const cartRoutes = require("./cart.route");
const searchRoutes = require("./search.route");
const cartMiddleware = require("../../middleware/client/cart.middleware");
const apiRoute = require("./api.route");
module.exports = (app) => {
  app.use(categoryMiddleware.category); //dung cho toan bo route co trong client, đỡ tốn tgian phải gán vào từng route
  // app.use(cartMiddleware.cartId);
  app.use("/", cartMiddleware.cartId, homeRoutes);
  app.use("/products", productRoutes);
  app.use("/cart", cartRoutes);
  app.use("/search", searchRoutes);
  app.use("/api/v1", apiRoute);
};

const productRoutes = require("./product.route");
const homeRoutes = require("./home.route");
const categoryMiddleware = require("../../middleware/client/category.middleware");
module.exports = (app) => {
  app.use(categoryMiddleware.category); //dung cho toan bo route co trong client, đỡ tốn tgian phải gán vào từng route
  app.use("/", homeRoutes);
  app.use("/products", productRoutes);
};

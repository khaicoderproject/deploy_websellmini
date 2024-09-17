const dashboardModel = require("../../models/product.model");

module.exports.dashboard = async (req, res) => {
  const dashboard = await dashboardModel.find({
    status: "active",
    deleted: false,
  });
  res.render("admin/pages/dashboard/index", {
    title: "Trang tổng quan",
    dashboard: dashboard,
  });
};

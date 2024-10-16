module.exports.index = async (req, res) => {
  res.render("client/pages/homes/index", {
    title: "Đây là trang chủ",
  });
};

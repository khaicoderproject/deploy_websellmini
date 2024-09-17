module.exports.createPost = (req, res, next) => {
  if (!req.body.title) {
    req.flash(
      "error",
      "Cập nhập không thành công, vui lòng nhập tên sản phẩm!"
    );
    res.redirect("back");
    return;
  }
  next(); // de di tiep toi phan controller
};
//validate tach rieng ra va import trong route

module.exports.loginPost = async (req, res , next) => {
  if (!req.body.email) {
    req.flash("error" , "Nhập email");
    res.redirect("/admin/auth/login");
    return ;
  }
  if (!req.body.password) {
    req.flash("error" , "Nhập password");
    res.redirect("/admin/auth/login");
    return ;
  }
  next() ;
};

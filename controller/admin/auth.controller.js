const Account = require("../../model/account.model") ;  
const md5 = require('md5') ;

// view login .
module.exports.login = async (req,res) => {
    res.render("admin/pages/auth/login" , {
        title : "Đăng nhập" ,
    })   
}

// login
module.exports.loginPost = async (req,res) => {
    const email = await Account.findOne(
        {
            email : req.body.email ,
            delete : false ,
        }
    )
    if (!email) {
        // req.flash("error" , "email không tồn tại") ;
        res.redirect("back") ;
        return ;
    }
    if (email.password != md5(req.body.password)) {
        // req.flash("error" , "Mật khẩu sai") ;
        res.redirect("back") ;
        return ;
    }
    res.cookie("token" , email.token) ; // save token in cookie to check login .
    res.redirect("/admin/dashboard") ;
}

// log out .
module.exports.logout = async (req,res) => {
    res.clearCookie("token") ;
    res.redirect("/admin/auth/login") ;
}
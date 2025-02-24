const Account = require("../../model/account.model") ;


module.exports.requireAuth = async (req,res,next) => {
    if (req.cookies.token) {
        const user = await Account.findOne(
            {
                token : req.cookies.token , 
                delete : false ,
            }
        ).select("-password") ;
        if (!user) res.redirect("/admin/auth/login") ;
        else {
            // account login .
            res.locals.user = user  ; // được sử dụng toàn cục trong tất cả các file của project .
            next() ;
        }
    }else {
        res.redirect("/admin/auth/login") ;
    }
}
// check xem sản phẩm tạo có nhập name chưa ? .

// create validate product .
module.exports.createValidate = (req,res,next) => {
    // nếu không đúng yêu cầu thì báo lỗi .
    if (!req.body.title) {
        // req.flash('error' , "Vui lòng nhập tên sản phẩm") ;
        res.redirect ("back") ;
        return  ;
    }
    // ngược lại thì chuyển sang bước tiếp theo => use next .
    next() ;
}


// create validate account .
module.exports.createValidateAccount = (req,res,next) => {
    // // nếu không đúng yêu cầu thì báo lỗi .
    // if (!req.body.fullname) {
    //     // req.flash('error' , "Vui lòng nhập tên sản phẩm") ;
    //     res.redirect ("back") ;
    //     return  ;
    // }
    // // ngược lại thì chuyển sang bước tiếp theo => use next .
    next() ;
}
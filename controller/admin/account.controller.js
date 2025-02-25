const Account = require("../../model/account.model") ;
const md5 = require('md5') ;

//[GET] views list account admin .
module.exports.index = async (req,res) => {
    const accounts = await Account.find({delete : false}).select("-token -password") ;
    res.render("admin/pages/account/index.pug" ,{
        title : "Danh sách tài khoản" , 
        account : accounts ,
    }) ;
}

//[GET] views create account admin .
module.exports.create = async (req,res) =>{
    res.render("admin/pages/account/create" ,{
        title : "Tạo tài khoản" , 
       
    })
}

//[POST] create account admin .
module.exports.createPost = async (req,res) =>{
    console.log(req.body) ;
   try {
    req.body.password = md5(req.body.password) ;
    const account = new Account(req.body) ;
    await account.save() ;
    // req.flash("success" , "Create success") ;
    res.redirect("/admin/account") ;
   }
   catch{
    // req.flash("error" , "create error") ;
    res.redirect("/admin/account") ;
   }

}
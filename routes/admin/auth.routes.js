const express = require('express') ;
const router = express.Router() ;

const controller = require("../../controller/admin/auth.controller") ;
const validate = require("../../validate/login.validate") ;

// views login admin .
router.get("/login" , controller.login) ;

// login admin .
router.post("/login" , validate.loginPost , controller.loginPost) ;

// logout admin
router.get("/logout" ,  controller.logout) ;



module.exports = router ;
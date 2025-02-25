const express = require("express") ;

const router = express.Router() ;
const controller = require("../../controller/admin/dashboard.controller")

//[GET] view dashboard .
router.get("/" , controller.index) ;

module.exports = router ;
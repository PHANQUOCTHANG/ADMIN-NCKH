const express = require("express") ;
const router = express.Router() ;

const controllerHotspot = require("../../controller/admin/hotspot.controller")

//[GET] view list hotspot .
router.get("/" , controllerHotspot.index) ;

//[GET] view create hotspot .
router.get("/create" , controllerHotspot.create) ;

//[POST] create hotspot .
router.post("/create" , controllerHotspot.createPost) ;

//[GET] view detail .
router.get("/detail/:id" , controllerHotspot.detail) ;


module.exports = router ;
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

//[GET] view edit hotspot .
router.get("/edit/:id" , controllerHotspot.edit) ;

//[PATCH] edit hotspot .
router.patch("/edit/:id" , controllerHotspot.editPatch) ;

//[DELETE] delete hotspot .
router.delete("/delete/:id" , controllerHotspot.delete) ;

module.exports = router ;
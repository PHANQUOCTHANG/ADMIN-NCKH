const express = require("express") ;
const router = express.Router() ;

const controllerModel = require("../../controller/admin/model.controller")

//[GET] view list hotspot .
router.get("/" , controllerModel.index) ;

//[GET] view create hotspot .
router.get("/create" , controllerModel.create) ;

//[POST] create hotspot .
router.post("/create" , controllerModel.createPost) ;

//[GET] view detail .
router.get("/detail/:id" , controllerModel.detail) ;

//[GET] view add hotspot in model .
router.get("/addHotspot/:modelId" , controllerModel.addHotspot) ;

//[GET] add hotspot in model .
router.post("/addHotspot/:modelId" , controllerModel.addHotspotPost) ;

//[GET] add hotspot in model .
router.post("/addHotspot/:modelId" , controllerModel.addHotspotPost) ;


module.exports = router ; 
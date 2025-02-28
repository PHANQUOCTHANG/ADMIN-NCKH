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

//[GET] delete hotspot in model .
router.get("/deleteHotspot/:modelId/:hotspotId" , controllerModel.deleteHotspot) ;

//[GET] view edit model .
router.get("/edit/:modelId" , controllerModel.edit) ;

//[PATCH] edit model .
router.patch("/edit/:modelId" , controllerModel.editPatch) ;

//[DELETE] delete model .
router.delete("/delete/:modelId" , controllerModel.delete) ;

//[PATCH] change-all .
router.patch("/change-all" , controllerModel.changeAll)


module.exports = router ; 
const express = require('express') ;
const router = express.Router() ;

const controller = require("../../controller/admin/assignment.controller") ;

router.get("/" , controller.index) ;
router.get("/create" , controller.create) ;
router.post("/create" , controller.createPost) ;
router.get("/edit/:assignmentId" , controller.edit) ;
router.patch("/edit/:assignmentId" , controller.editPatch) ;

module.exports = router ;
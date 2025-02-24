const e = require("express");
const Model = require("../../model/model.model");
const Hotspot = require("../../model/hotspot.model");

//[GET] view list model .
module.exports.index = async (req, res) => {
  const model = await Model.find({ delete: false});
  res.render("admin/pages/model/index.pug", {
    title: "Danh sách model",
    model : model ,
  });
};

//[GET] view create model .
module.exports.create = async (req, res) => {
  res.render("admin/pages/model/create.pug", {
    title: "Tạo model",
  });
};

//[POST] create model .
module.exports.createPost = async (req, res) => {
  try {
    const model = new Model(req.body);
    model.save() ;
    res.redirect("/admin/model") ;
  }
  catch {
    console.log("No create model");
    res.redirect("/admin/model") ;
  }
};

//[GET] view detail model .
module.exports.detail = async (req, res) => {
  const id = req.params.id ;
  const model = await Model.findOne({_id : id , delete : false});
  const hotspots = [] ;
  for (let item of model.hotspots) {
    const hotspot = await Hotspot.findOne({_id : item.hotspot_id , delete : false});
    if (hotspot) {  
      hotspots.push(hotspot) ;
    }
  }
  res.render("admin/pages/model/detail.pug" , {
    model : model ,
    hotspot : hotspots ,
  })
}

// //[GET] view update hotspot .
// module.exports.update = async (req, res) => {
//   try {
//     const id = req.params.id;
//     const hotspot = await Hotspot.findOne({
//       delete: false,
//       status: "active",
//       _id: id,
//     });
//     res.render("admin/pages/hotspot/update.pug", {
//       title: "Cập nhật hotspot",
//       hotspot: hotspot,
//     });
//   } catch {
//     console.log("error");
//   }
// };

// //[PATCH] update hotspots .
// module.exports.updatePatch = async (req, res) => {
//   try {
//     const hotspotId = req.params.id;
//     console.log(hotspotId);
//     req.body.x += "m";
//     req.body.y += "m";
//     req.body.z += "m";
//     console.log(req.body);
//     await Hotspot.updateOne({ _id: hotspotId }, req.body);
//     res.redirect("back");
//   } catch {
//     console.log("error");
//   }
// };

// module.exports.delete = async (req, res) => {
//   try {
//     const id = req.params.id;
//     await Hotspot.updateOne({ _id: id }, { delete: true });
//     res.redirect("/admin/hotspot");
//   } catch {
//     console.log("Delete no success");
//     res.redirect("/admin/hotspot");
//   }
// };


module.exports.addHotspot = async (req, res) => {
 try {
    const model = await Model.findOne({_id : req.params.modelId}) ;
    const hotspots = await Hotspot.find({ delete: false, status: "active" });
    const modelHotspot = model.hotspots.map((item)=>{
      return item.hotspot_id ;
    })
    const newHotspot = [] ;
    for (let item of hotspots) {
      if (!modelHotspot.includes(item.id)) newHotspot.push(item) ;
    }
    console.log(newHotspot) ;
    res.render("admin/pages/model/listHotspot.pug", {
      title: "Danh sách hotspot",
      hotspot:  newHotspot ,
      modelId : req.params.modelId ,
    }); 
 }
 catch {
  console.log("error") ;
  res.redirect("/admin/model") ;
 }
}


module.exports.addHotspotPost = async (req, res) => {
 try {
    const modelId = req.params.modelId ;
    const hotspotId = req.body.hotspotId ;
    const hotspot = {
      hotspot_id : hotspotId ,
    }
    console.log(modelId) ;
    console.log(hotspot) ;
    await Model.updateOne(
      {
        _id : modelId ,
      },
      {
        $push : {hotspots : hotspot} ,
      }
    )
 }
 catch {
  console.log("error") ;
 }
 res.send("back") 
}


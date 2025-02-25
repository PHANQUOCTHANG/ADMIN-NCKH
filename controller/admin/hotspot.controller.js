const e = require("express");
const Hotspot = require("../../model/hotspot.model");

//[GET] view list hotspot .
module.exports.index = async (req, res) => {
  const hotspots = await Hotspot.find({ delete: false, status: "active" });
  res.render("admin/pages/hotspot/index.pug", {
    title: "Danh sách hotspot",
    hotspot: hotspots,
  });
};

//[GET] view create hotspots .
module.exports.create = async (req, res) => {
  res.render("admin/pages/hotspot/create.pug", {
    title: "Tạo hotspot",
  });
};

//[POST] create hotspots .
module.exports.createPost = async (req, res) => {
  let slot;
  try {
    const hotspots = await Hotspot.find({ delete: false, status: "active" });
    const length = hotspots.length + 1;
    slot = "hotspot-" + length;
  } catch {
    slot = "hotspot-1";
    console.log("error");
  }
  req.body.slot = slot;
  req.body.x += "m";
  req.body.y += "m";
  req.body.z += "m";
  console.log(req.body);
  const hotspotsObject = new Hotspot(req.body);
  await hotspotsObject.save();
  res.redirect("/admin/hotspot");
};

//[GET] view edit hotspot .
module.exports.edit = async (req, res) => {
  try {
    const id = req.params.id;
    const hotspot = await Hotspot.findOne({
      delete: false,
      status: "active",
      _id: id,
    });
    res.render("admin/pages/hotspot/edit.pug", {
      title: "Cập nhật dữ liệu",
      hotspot: hotspot,
    });
  } catch {
    console.log("error");
  }
};

//[PATCH] edit hotspots .
module.exports.editPatch = async (req, res) => {
  console.log(req.body) ;
  try {
    const hotspotId = req.params.id;
    console.log(hotspotId);
    if (!req.body.x.includes("m")) req.body.x += "m";
    if (!req.body.y.includes("m")) req.body.y += "m";
    if (!req.body.z.includes("m")) req.body.z += "m";
    await Hotspot.updateOne({ _id: hotspotId }, req.body);
    res.redirect("back");
  } catch {
    console.log("error");
  }
};

//[DELETE] delete hotspot .
module.exports.delete = async (req, res) => {
  try {
    const id = req.params.id;
    await Hotspot.updateOne({ _id: id }, { delete: true });
    res.redirect("/admin/hotspot");
  } catch {
    console.log("Delete no success");
    res.redirect("/admin/hotspot");
  }
};


//[GET] detail hotspot .
module.exports.detail = async (req,res) => {
    try {
        const id = req.params.id;
        const hotspot = await Hotspot.findOne({ _id: id }, { delete: false });
        res.render("admin/pages/hotspot/detail" , {
            title: "Chi tiết hotspot",
            hotspot : hotspot ,
        })
      } catch {
        console.log("error");
        res.redirect("/admin/hotspot");
      }
}
const e = require("express");
const Model = require("../../model/model.model");
const Hotspot = require("../../model/hotspot.model");
const { model } = require("mongoose");

// [GET] views model .
module.exports.index = async (req, res) => {
  const status = req.query.status;
  const find = {
    delete: false,
  };
  if (status) find.status = status;
  let keyword = "";
  if (req.query.keyword) {
    keyword = req.query.keyword;
    const regex = new RegExp(keyword, "i");
    find.name = regex;
  }

  const objPage = {
    limit: 5,
    currentPage: 1,
  };

  if (req.query.page) {
    objPage.currentPage = parseInt(req.query.page);
  }

  objPage.skip = (objPage.currentPage - 1) * objPage.limit;

  const sizePage = await Model.countDocuments(find);
  console.log(sizePage) ;

  objPage.totalPage = Math.min(10 , Math.ceil(sizePage / objPage.limit));

  // object sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;
    //khi thêm 1 key trong object mà key đó đang ở dạng string thì không thể dùng dấu '.' mà phải dùng  object[key]  .
    sort[sortKey] = sortValue;
  } else {
    sort.position = "desc"; // key  không ở dạng string .
  }
  // End object sort

  const model = await Model.find(find)
    .sort(sort)
    .limit(objPage.limit)
    .skip(objPage.skip);
  res.render("admin/pages/model/index", {
    title: "Danh sách Model",
    model: model,
    keyword: keyword,
    objPage: objPage,
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
    await model.save();
    req.flash("success", "Tạo model thành công");
    res.redirect("/admin/model");
  } catch {
    req.flash("error", "Lỗi");
    res.redirect("/admin/model");
  }
};

//[GET] view detail model .
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const model = await Model.findOne({ _id: id, delete: false });
    const hotspots = [];
    for (let item of model.hotspots) {
      const hotspot = await Hotspot.findOne({
        _id: item.hotspot_id,
        delete: false,
      });
      if (hotspot) {
        hotspots.push(hotspot);
      }
    }
    res.render("admin/pages/model/detail.pug", {
      model: model,
      hotspot: hotspots,
    });
  } catch {}
};

//[GET] view edit model .
module.exports.edit = async (req, res) => {
  try {
    const modelId = req.params.modelId;
    const model = await Model.findOne({
      delete: false,
      _id: modelId,
    });
    console.log(model.id) ;
    res.render("admin/pages/model/edit.pug", {
      title: "Cập nhật model",
      model: model,
    });
  } catch {
    console.log("error");
  }
};

//[PATCH] edit model .
module.exports.editPatch = async (req, res) => {
  try {
    const modelId = req.params.modelId;
    console.log(req.body);
    await Model.updateOne({ _id: modelId }, {
      name : req.body.name ,
      linkFile : req.body.linkFile ,
      description : req.body.description ,  
      thumbnail : req.body.thumbnail ,
    });
    res.redirect("/admin/model");
  } catch {
    console.log("error");
  }
};

//[DELETE] delete model .
module.exports.delete = async (req, res) => {
  try {
    const modelId = req.params.modelId;
    await Model.updateOne({ _id: modelId }, { delete: true });
  } catch {
    console.log("Delete no success");
  }
  res.redirect("back");
};

// view add hotspot in model .
module.exports.addHotspot = async (req, res) => {
  try {
    const model = await Model.findOne({ _id: req.params.modelId });
    const hotspots = await Hotspot.find({ delete: false, status: "active" });
    const modelHotspot = model.hotspots.map((item) => {
      return item.hotspot_id;
    });
    const newHotspot = [];
    for (let item of hotspots) {
      if (!modelHotspot.includes(item.id)) newHotspot.push(item);
    }
    res.render("admin/pages/model/listHotspot.pug", {
      title: "Danh sách hotspot",
      hotspot: newHotspot,
      modelId: req.params.modelId,
    });
  } catch {
    console.log("error");
    res.redirect("/admin/model");
  }
};

// add hotspot in model
module.exports.addHotspotPost = async (req, res) => {
  try {
    const modelId = req.params.modelId;
    const hotspotId = req.body.hotspotId;
    const hotspot = {
      hotspot_id: hotspotId,
    };
    await Model.updateOne(
      {
        _id: modelId,
      },
      {
        $push: { hotspots: hotspot },
      }
    );
    req.flash("success", "Thêm thành công");
  } catch {
    req.flash("success", "Thêm thất bại");
  }
  res.redirect("back");
};

// delete hotspot of model .
module.exports.deleteHotspot = async (req, res) => {
  try {
    const modelId = req.params.modelId;
    const hotspotId = req.params.hotspotId;
    await Model.updateOne(
      {
        _id: modelId,
      },
      {
        $pull: {
          hotspots: { hotspot_id: hotspotId },
        },
      }
    );
  } catch {
    console.log("error");
  }
  res.redirect("back");
};

//[PATCH] change all .
module.exports.changeAll = async (req, res) => {
  try {
    // const updateBy = {
    //   account_id: res.locals.user.id,
    //   updateAt: new Date(),
    // };
    const modelId = req.body.modelId;
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    console.log(modelId);
    console.log(type);
    console.log(ids);

    switch (type) {
      // case "active":
      //   await Model.updateMany(
      //     { _id: { $in: ids } },
      //     {
      //       status: "active",
      //       // $push: { updateBy: updateBy },
      //     }
      //   );
      //   break;
      // case "inactive":
      //   await Model.updateMany(
      //     { _id: { $in: ids } },
      //     {
      //       status: "inactive",
      //       // $push: { updateBy: updateBy },
      //     }
      //   );
      //   break;
      case "add": {
        // await Model.updateOne(
        //   { _id: modelId },
        //   { $push: { hotspots: { $each: ids } } }
        // ) ;
        for (const id of ids) {
          await Model.updateOne(
            { _id: modelId },
            { $push: { hotspots: {hotspot_id : id} }}
          );
        }
        req.flash("success", "Thêm thành công");
        break;
      }
      case "delete":
        // const deleteBy = {
        //   account_id: res.locals.user.id,
        //   deleteAt: new Date(),
        // };
        await Model.updateMany(
          { _id: { $in: ids } },
          { delete: true }
          // { delete: true, deleteBy: deleteBy }
        );
        req.flash("success", "Xóa thành công");
        break;
      default:
        break;
    }
  } catch {
    req.flash("error", "Xóa thất bại");
  }

  res.redirect("back");
};

const e = require("express");
const Hotspot = require("../../model/hotspot.model");
const Model = require("../../model/model.model");

//[GET] view list hotspot .
module.exports.index = async (req, res) => {
  const find = {
    delete: false,
  };

  if (req.query.status) find.status = req.query.status;

  if (req.query.keyword) {
    const regex = new RegExp(req.body.keyword, "i");
    find.name = regex;
  }

  const sort = {};
  if (req.query.sortKey & req.query.sortValue)
    sort[req.query.sortKey] = req.query.sortValue;

  const objPage = {
    limit: 5,
    currentPage: 1,
  };

  if (req.query.page) objPage.currentPage = parseInt(req.query.page);

  const countRecord = await Hotspot.countDocuments(find);

  objPage.skip = (objPage.currentPage - 1) * objPage.limit;
  objPage.totalPage = Math.min(10, Math.ceil(countRecord / objPage.limit));

  const hotspots = await Hotspot.find(find)
    .sort(sort)
    .skip(objPage.skip)
    .limit(objPage.limit);
  res.render("admin/pages/hotspot/index.pug", {
    title: "Danh sách hotspot",
    hotspot: hotspots,
    objPage: objPage,
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
  console.log(req.body);
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
    const confirmDelete = confirm("Bạn có chắc muốn xóa không ? ");
    if (confirmDelete) {
      const id = req.params.id;
      await Hotspot.updateOne({ _id: id }, { delete: true });
      res.redirect("/admin/hotspot");
    }
  } catch {
    console.log("Delete no success");
    res.redirect("/admin/hotspot");
  }
};

//[GET] detail hotspot .
module.exports.detail = async (req, res) => {
  try {
    const id = req.params.id;
    const hotspot = await Hotspot.findOne({ _id: id }, { delete: false });
    res.render("admin/pages/hotspot/detail", {
      title: "Chi tiết hotspot",
      hotspot: hotspot,
    });
  } catch {
    console.log("error");
    res.redirect("/admin/hotspot");
  }
};

//[PATCH] change all .
module.exports.changeAll = async (req, res) => {
  try {
    // const updateBy = {
    //   account_id: res.locals.user.id,
    //   updateAt: new Date(),
    // };
    const type = req.body.type;
    const ids = req.body.ids.split(", ");
    console.log(type);
    console.log(ids);

    switch (type) {
      case "active":
        await Hotspot.updateMany(
          { _id: { $in: ids } },
          {
            status: "active",
            // $push: { updateBy: updateBy },
          }
        );
        req.flash("success", "Thay đổi trạng thái thành công");
        break;
      case "inactive":
        await Hotspot.updateMany(
          { _id: { $in: ids } },
          {
            status: "inactive",
            // $push: { updateBy: updateBy },
          }
        );
        req.flash("success", "Thay đổi trạng thái thành công");
        break;
      case "delete":
        // const deleteBy = {
        //   account_id: res.locals.user.id,
        //   deleteAt: new Date(),
        // };
        await Hotspot.updateMany(
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

//[GET] hotspot link model .
module.exports.linkModel = async (req, res) => {
  console.log(req.params.hotspotId);
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

  objPage.totalPage = Math.min(10, Math.ceil(sizePage / objPage.limit));

  // // object sort
  let sort = {};
  if (req.query.sortKey && req.query.sortValue) {
    const sortKey = req.query.sortKey;
    const sortValue = req.query.sortValue;
    //khi thêm 1 key trong object mà key đó đang ở dạng string thì không thể dùng dấu '.' mà phải dùng  object[key]  .
    sort[sortKey] = sortValue;
  } else {
    // sort.position = "desc"; // key  không ở dạng string .
  }
  // // End object sort
  console.log(find);
  console.log(sort);
  const model = await Model.find(find)
    .sort(sort)
    .limit(objPage.limit)
    .skip(objPage.skip);
  res.render("admin/pages/hotspot/linkModel", {
    title: "Danh sách Model",
    model: model,
    keyword: keyword,
    objPage: objPage,
    hotspotId: req.params.hotspotId,
  });
};

////[PATCH] hotspot link model .
module.exports.linkModelPatch = async (req, res) => {
  try {
    const hotspotId = req.params.hotspotId;
    const modelId = req.params.modelId;
    await Hotspot.updateOne(
      {
        _id: hotspotId,
      },
      {
        modelId: modelId,
      }
    );
    console.log("OK") ;
  } catch {}
  res.redirect("/admin/hotspot") ;
};

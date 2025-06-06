const Assignment = require("../../model/assignment.model");

// view all assignments .
module.exports.index = async (req, res) => {
  const find = {
    delete: false,
  };
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

  if (req.query.page) objPage.currentPage = parseInt(req.query.page) ; ;

  const countRecord = await Assignment.countDocuments(find);

  objPage.skip = (objPage.currentPage - 1) * objPage.limit ;
  objPage.totalPage = Math.min(10, Math.ceil(countRecord / objPage.limit));

  const assignments = await Assignment.find(find)
    .sort(sort)
    .skip(objPage.skip) 
    .limit(objPage.limit)

  res.render("admin/pages/assignment/index", {
    title: "Assignment",
    assignments: assignments,
    objPage : objPage ,
  });
};

// view create assignment .
module.exports.create = (req, res) => {
  res.render("admin/pages/assignment/create", {
    title: "Create Assignment",
  });
};

// create assignment .
module.exports.createPost = async (req, res) => {
  try {
    let assignment = new Assignment(req.body);
    assignment.answers.push(req.body.answerA);
    assignment.answers.push(req.body.answerB);
    assignment.answers.push(req.body.answerC);
    assignment.answers.push(req.body.answerD);
    switch (req.body.correctAnswer) {
      case "A":
        assignment.correct_answer = req.body.answerA;
        break;
      case "B":
        assignment.correct_answer = req.body.answerB;
        break;
      case "C":
        assignment.correct_answer = req.body.answerC;
        break;
      case "D":
        assignment.correct_answer = req.body.answerD;
        break;
    }
    await assignment.save();
    res.redirect("/admin/assignment");
  } catch {}
};

// view edit assignment .
module.exports.edit = async (req, res) => {
  const assignmentId = req.params.assignmentId;
  const assignment = await Assignment.findOne({
    _id: assignmentId,
    delete: false,
  });
  res.render("admin/pages/assignment/edit", {
    title: "Edit Assignment",
    assignment: assignment,
  });
};

// edit assignment .
module.exports.editPatch = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    let assignment = new Assignment(req.body);
    assignment.answers.push(req.body.answerA);
    assignment.answers.push(req.body.answerB);
    assignment.answers.push(req.body.answerC);
    assignment.answers.push(req.body.answerD);
    switch (req.body.correctAnswer) {
      case "A":
        assignment.correct_answer = req.body.answerA;
        break;
      case "B":
        assignment.correct_answer = req.body.answerB;
        break;
      case "C":
        assignment.correct_answer = req.body.answerC;
        break;
      case "D":
        assignment.correct_answer = req.body.answerD;
        break;
    }
    console.log(assignment);
    await Assignment.updateOne(
      { _id: assignmentId },
      {
        question: assignment.question,
        answers: assignment.answers,
        correct_answer: assignment.correct_answer,
      }
    );
    res.redirect("back");
  } catch {}
};

// view detail assignment .
module.exports.detail = async (req, res) => {
  res.send("OK");
};

module.exports.delete = async (req, res) => {
  try {
    const assignmentId = req.params.assignmentId;
    await Assignment.updateOne({ _id: assignmentId }, { delete: true });
    res.redirect("/admin/assignment");
  } catch {}
};

//[PATCH] change all .
module.exports.changeAll = async (req, res) => {
  try {
    // const updateBy = {
    //   account_id: res.locals.user.id,
    //   updateAt: new Date(),
    // };
    const modelId = req.body.assignmentId ;
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
      // case "add": {
      //   // await Model.updateOne(
      //   //   { _id: modelId },
      //   //   { $push: { hotspots: { $each: ids } } }
      //   // ) ;
      //   for (const id of ids) {
      //     await Model.updateOne(
      //       { _id: modelId },
      //       { $push: { hotspots: {hotspot_id : id} }}
      //     );
      //   }
      //   req.flash("success", "Thêm thành công");
      //   break;
      // }
      case "delete":
        // const deleteBy = {
        //   account_id: res.locals.user.id,
        //   deleteAt: new Date(),
        // };
        await Assignment.updateMany(
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


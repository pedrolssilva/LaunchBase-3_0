const { age, graduation, date } = require("../../lib/utils");
const teacher = require("../models/teacher");
module.exports = {
  //index
  index(req, res) {
    teacher.all(function (teachers) {
      return res.render(`teachers/index`, { teachers });
    });
  },

  //create
  create(req, res) {
    return res.render("teachers/create");
  },

  //post
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }
    teacher.create(req.body, function (teacher) {
      return res.redirect(`/teachers/${teacher.id}`);
    });
  },

  //show
  show(req, res) {
    teacher.find(req.params.id, function (teacher) {
      if (!teacher) {
        return res.send("Teacher not found!");
      }
      teacher.age = age(teacher.birthdate);
      teacher.educational_level = graduation(teacher.educational_level);
      teacher.subjects_taught = teacher.subjects_taught.trim().split(",");
      teacher.created_at = new Intl.DateTimeFormat("pt-BR").format(
        teacher.created_at
      );

      return res.render("teachers/show", { teacher });
    });
  },

  //edit
  edit(req, res) {
    teacher.find(req.params.id, function (teacher) {
      if (!teacher) {
        return res.send("Teacher not found!");
      }
      teacher.birthdate = date(teacher.birthdate).iso;
      teacher.subjects_taught = teacher.subjects_taught.trim().split(",");

      return res.render("teachers/edit", { teacher });
    });
  },

  //put
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }
    teacher.update(req.body, function () {
      return res.redirect(`/teachers/${req.body.id}`);
    });
  },

  //delete
  delete(req, res) {
    teacher.delete(req.body.id, function () {
      return res.redirect(`/teachers`);
    });
  },
};

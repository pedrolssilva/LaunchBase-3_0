const { age, date, grade } = require("../../lib/utils");
const student = require("../models/student");
module.exports = {
  //index
  index(req, res) {
    student.all(function (students) {
      return res.render(`students/index`, { students });
    });
  },

  //create
  create(req, res) {
    return res.render("students/create");
  },

  //post
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }
    student.create(req.body, function (student) {
      return res.redirect(`/students/${student.id}`);
    });
  },

  //show
  show(req, res) {
    student.find(req.params.id, function (student) {
      if (!student) {
        return res.send("Student not found!");
      }
      student.age = age(student.birth);
      student.birth = date(student.birth).birthDay;
      student.school_phase = grade(student.school_phase);
      return res.render("students/show", { student });
    });
  },

  //edit
  edit(req, res) {
    student.find(req.params.id, function (student) {
      if (!student) {
        return res.send("Student not found!");
      }
      student.birth = date(student.birth).iso;

      return res.render("students/edit", { student });
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
    student.update(req.body, function () {
      return res.redirect(`/students/${req.body.id}`);
    });
  },

  //delete
  delete(req, res) {
    student.delete(req.body.id, function () {
      return res.redirect(`/students`);
    });
  },
};

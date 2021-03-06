const { age, date, grade } = require("../../lib/utils");
const Student = require("../models/student");
module.exports = {
  //index
  index(req, res) {
    let { filter, page, limit } = req.query;

    page = page || 1;
    limit = limit || 2;
    let offset = limit * (page - 1);

    const params = {
      filter,
      page,
      limit,
      offset,
      callback(students) {
        const pagination = {
          total: Math.ceil(students[0].total / limit),
          page,
        };

        students.map((student) => {
          student.school_phase = grade(student.school_phase);
        });

        return res.render(`students/index`, {
          students,
          pagination,
          filter,
        });
      },
    };

    Student.paginate(params);
  },

  //create
  create(req, res) {
    Student.teachersSelectOptions(function (options) {
      return res.render("students/create", {
        teacherOptions: options,
      });
    });
  },

  //post
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }
    Student.create(req.body, function (student) {
      return res.redirect(`/students/${student.id}`);
    });
  },

  //show
  show(req, res) {
    Student.find(req.params.id, function (student) {
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
    Student.find(req.params.id, function (student) {
      if (!student) {
        return res.send("Student not found!");
      }
      student.birth = date(student.birth).iso;

      Student.teachersSelectOptions(function (options) {
        return res.render("students/edit", {
          student,
          teacherOptions: options,
        });
      });
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
    Student.update(req.body, function () {
      return res.redirect(`/students/${req.body.id}`);
    });
  },

  //delete
  delete(req, res) {
    Student.delete(req.body.id, function () {
      return res.redirect(`/students`);
    });
  },
};

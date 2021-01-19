const { age, graduation, date } = require("../../lib/utils");
const Teacher = require("../models/teacher");
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
      callback(teachers) {
        const pagination = {
          total: Math.ceil(teachers[0].total / limit),
          page,
        };

        teachers.map((teacher) => {
          teacher.subjects_taught = teacher.subjects_taught.trim().split(",");
        });

        return res.render(`teachers/index`, {
          teachers,
          pagination,
          filter,
        });
      },
    };

    Teacher.paginate(params);
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
    Teacher.create(req.body, function (teacher) {
      return res.redirect(`/teachers/${teacher.id}`);
    });
  },

  //show
  show(req, res) {
    Teacher.find(req.params.id, function (teacher) {
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
    Teacher.find(req.params.id, function (teacher) {
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
    Teacher.update(req.body, function () {
      return res.redirect(`/teachers/${req.body.id}`);
    });
  },

  //delete
  delete(req, res) {
    Teacher.delete(req.body.id, function () {
      return res.redirect(`/teachers`);
    });
  },
};

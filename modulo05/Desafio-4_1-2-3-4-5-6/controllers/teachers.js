const fs = require("fs");
const data = require("../data.json");
const { age, graduation, date } = require("../utils");

//index
exports.index = function (req, res) {
  const teachers = data.teachers.map((teacher) => {
    return { ...teacher, services: teacher.services.trim().split(",") };
  });

  return res.render("teachers/index", { teachers });
};

//create
exports.create = function (req, res) {
  return res.render("teachers/create");
};

//post
exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, fill all fields");
    }
  }
  let {
    avatar_url,
    name,
    birth,
    educationalLevel,
    classType,
    services,
  } = req.body;

  birth = Date.parse(birth);
  const created_at = Date.now();
  const id = Number(data.teachers.length + 1);

  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    educationalLevel,
    classType,
    services,
    created_at,
  });

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error!");

    return res.redirect("/teachers");
  });
};

//show
exports.show = function (req, res) {
  const { id } = req.params;
  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id;
  });

  if (!foundTeacher) {
    return res.send("Teacher not found!");
  }

  const teacher = {
    ...foundTeacher,
    age: age(foundTeacher.birth),
    services: foundTeacher.services.trim().split(","),
    graduation: graduation(foundTeacher.educationalLevel),
    created_at: new Intl.DateTimeFormat("pt-BR").format(
      foundTeacher.created_at
    ),
  };

  return res.render("teachers/show", { teacher });
};

//edit
exports.edit = function (req, res) {
  const { id } = req.params;

  const foundTeacher = data.teachers.find(function (teacher) {
    return teacher.id == id;
  });

  if (!foundTeacher) {
    return res.send("Teacher not found!");
  }

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth).iso,
  };

  return res.render("teachers/edit", { teacher });
};

//put
exports.put = function (req, res) {
  const { id } = req.body;

  let index = 0;

  const foundTeacher = data.teachers.find(function (teacher, foundIndex) {
    if (teacher.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundTeacher) {
    return res.send("Teacher not found!");
  }

  const teacher = {
    ...foundTeacher,
    ...req.body,
    birth: Date.parse(req.body.birth),
  };

  data.teachers[index] = teacher;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write error");
    }

    return res.redirect(`/teachers/${id}`);
  });
};

//delete
exports.delete = function (req, res) {
  const { id } = req.body;

  const filteredTeachers = data.teachers.filter(function (teacher) {
    return teacher.id != id;
  });

  data.teachers = filteredTeachers;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write error");
    }

    return res.redirect(`/teachers`);
  });
};

const fs = require("fs");
const data = require("../data.json");

exports.index = function (req, res) {
  res.render("admin/index", { recipes: data.recipes });
};

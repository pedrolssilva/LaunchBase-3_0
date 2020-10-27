const fs = require("fs");
const data = require("../data.json");

exports.index = function (req, res) {
  res.render("recipes/recipes", { recipes: data.recipes });
};

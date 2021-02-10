const Recipe = require("../models/recipe");

exports.index = function (req, res) {
  Recipe.all(function (recipes) {
    return res.render("recipes/recipes", { recipes });
  });
};

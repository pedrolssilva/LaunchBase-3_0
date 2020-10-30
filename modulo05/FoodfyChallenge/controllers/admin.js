const fs = require("fs");
const data = require("../data.json");

exports.index = function (req, res) {
  res.render("admin/index", { recipes: data.recipes });
};

exports.show = function (req, res) {
  const { id } = req.params;
  const foundRecipe = data.recipes.find(function (recipe) {
    return recipe.id == id;
  });

  if (!foundRecipe) {
    return res.send("Recipe not found!");
  }

  res.render("admin/show", { recipe: foundRecipe });
};

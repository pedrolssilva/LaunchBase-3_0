const { Console } = require("console");
const fs = require("fs");
const data = require("../../data.json");

exports.index = function (req, res) {
  res.render("admin/recipes/index", { recipes: data.recipes });
};

exports.create = function (req, res) {
  res.render("admin/recipes/create");
};

exports.edit = function (req, res) {
  const { id } = req.params;
  const foundRecipe = data.recipes.find(function (recipe) {
    return recipe.id == id;
  });

  if (!foundRecipe) {
    return res.send("Recipe not found!");
  }

  res.render("admin/recipes/edit", { recipe: foundRecipe });
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, fill all fields");
    }
  }

  let id = 1;
  const lastRecipe = data.recipes[data.recipes.length - 1];

  if (lastRecipe) {
    id = lastRecipe.id + 1;
  }

  const newRecipe = {
    id,
    ...req.body,
    ingredients: req.body.ingredients.filter((ingredient) => {
      return ingredient != "" && ingredient != null;
    }),
    prepareMode: req.body.prepareMode.filter((prMode) => {
      return prMode != "" && prMode != null;
    }),
  };

  data.recipes.push(newRecipe);

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send("Write file error!");

    return res.redirect(`/admin/recipes/${id}`);
  });
};

exports.show = function (req, res) {
  const { id } = req.params;
  const foundRecipe = data.recipes.find(function (recipe) {
    return recipe.id == id;
  });

  if (!foundRecipe) {
    return res.send("Recipe not found!");
  }

  res.render("admin/recipes/show", { recipe: foundRecipe });
};

//put
exports.put = function (req, res) {
  const { id } = req.body;
  let index = 0;
  const foundRecipe = data.recipes.find(function (recipe, foundIndex) {
    if (recipe.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundRecipe) {
    return res.send("Recipe not found!");
  }

  const recipe = {
    ...foundRecipe,
    ...req.body,
    ingredients: req.body.ingredients.filter((ingredient) => {
      return ingredient != "" && ingredient != null;
    }),
    prepareMode: req.body.prepareMode.filter((prMode) => {
      return prMode != "" && prMode != null;
    }),
    id: Number(id),
  };

  data.recipes[index] = recipe;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write error");
    }

    return res.redirect(`/admin/recipes/${id}`);
  });
};

//delete
exports.delete = function (req, res) {
  const { id } = req.params;

  let index = 0;

  const foundRecipe = data.recipes.find(function (recipe, foundIndex) {
    if (recipe.id == id) {
      index = foundIndex;
      return true;
    }
  });

  if (!foundRecipe) {
    return res.send("Recipe not found to be deleted!");
  }

  const filteredRecipes = data.recipes.filter(function (recipe) {
    return recipe.id != id;
  });

  data.recipes = filteredRecipes;

  fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send("Write error");
    }

    return res.redirect(`/admin/recipes/`);
  });
};

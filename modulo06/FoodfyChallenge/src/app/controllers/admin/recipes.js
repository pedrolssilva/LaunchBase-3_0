const Recipe = require("../../models/recipe");

exports.index = function (req, res) {
  Recipe.all(function (recipes) {
    return res.render("admin/recipes/index", { recipes });
  });
};

exports.create = function (req, res) {
  Recipe.chefsSelectOptions(function (options) {
    return res.render("admin/recipes/create", { chefOptions: options });
  });
};

exports.edit = function (req, res) {
  const { id } = req.params;

  Recipe.find(id, function (recipe) {
    if (!recipe) {
      return res.send("Recipe not found!");
    }

    Recipe.chefsSelectOptions(function (options) {
      return res.render("admin/recipes/edit", {
        recipe,
        chefOptions: options,
      });
    });
  });
};

exports.post = function (req, res) {
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, fill all fields");
    }
  }
  Recipe.create(req.body, function (recipe) {
    return res.redirect(`/admin/recipes/${recipe.id}`);
  });
};

exports.show = function (req, res) {
  const { id } = req.params;

  Recipe.find(id, function (recipe) {
    if (!recipe) {
      return res.send("Recipe not found!");
    }
    res.render("admin/recipes/show", { recipe });
  });
};

//put
exports.put = function (req, res) {
  const { id } = req.body;
  const keys = Object.keys(req.body);

  for (key of keys) {
    if (req.body[key] == "") {
      return res.send("Please, fill all fields");
    }
  }

  Recipe.update(req.body, function () {
    return res.redirect(`/admin/recipes/${id}`);
  });
};

//delete
exports.delete = function (req, res) {
  const { id } = req.params;

  Recipe.delete(id, function () {
    return res.redirect(`/admin/recipes/`);
  });
};

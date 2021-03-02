const Recipe = require("../models/recipe");

exports.index = function (req, res) {
  Recipe.all(function (recipes) {
    return res.render("recipes/recipes", { recipes });
  });
};

exports.findRecipes = function (req, res) {
  let { filter, page, limit } = req.query;

  page = page || 1;
  limit = limit || 2;
  let offset = limit * (page - 1);

  const params = {
    filter,
    page,
    limit,
    offset,
    callback(recipes) {
      const pagination = {
        total: Math.ceil(recipes[0].total / limit),
        page,
      };
      return res.render("recipes/foundRecipes", {
        recipes,
        pagination,
        filter,
      });
    },
  };

  Recipe.findByName(params);
};

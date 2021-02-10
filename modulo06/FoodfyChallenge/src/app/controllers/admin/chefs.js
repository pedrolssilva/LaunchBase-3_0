const { date } = require("../../../lib/utils");
const Chef = require("../../models/chef");

module.exports = {
  //index
  index(req, res) {
    Chef.all(function (chefs) {
      return res.render(`admin/chefs/index`, { chefs });
    });
  },

  // create
  create(req, res) {
    return res.render("admin/chefs/create");
  },

  // post
  post(req, res) {
    const keys = Object.keys(req.body);
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    Chef.create(req.body, function (chef) {
      return res.redirect(`/admin/chefs/${chef.id}`);
    });
  },

  //show
  show(req, res) {
    Chef.find(req.params.id, function (chef) {
      if (!chef) {
        return res.send("chef not found!");
      }
      chef.created_at = date(chef.created_at).format;

      Chef.findRecipesByChefId(chef.id, function (recipes) {
        return res.render("admin/chefs/show", { chef, recipes });
      });
    });
  },

  //edit
  edit(req, res) {
    Chef.find(req.params.id, function (chef) {
      if (!chef) {
        return res.send("Chef not found!");
      }
      return res.render("admin/chefs/edit", { chef });
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

    Chef.update(req.body, function () {
      return res.redirect(`/admin/chefs/${req.body.id}`);
    });
  },

  //delete
  delete(req, res) {
    const { id } = req.body;
    Chef.findRecipesByChefId(id, function (recipes) {
      if (recipes.length > 0) {
        return res.send("Chefs has recipes and can't to be deleted!");
      }

      Chef.delete(id, function () {
        return res.redirect(`/admin/chefs`);
      });
    });
  },
};

const { date } = require("../../../lib/utils");
const chef = require("../../models/chef");
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
      return res.render("admin/chefs/show", { chef });
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
  },

  //delete
  delete(req, res) {
    Chef.delete(req.body.id, function () {
      return res.redirect(`/admin/chefs`);
    });
  },
};

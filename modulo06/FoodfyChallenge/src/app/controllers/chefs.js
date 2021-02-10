const Chef = require("../models/chef");

exports.index = function (req, res) {
  Chef.all(function (chefs) {
    return res.render("chefs/chefs", { chefs });
  });
};

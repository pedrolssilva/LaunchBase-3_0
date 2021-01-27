const data = require("../data.json");

//show
exports.show = function (req, res) {
  res.render("general/about", { data: data.about });
};

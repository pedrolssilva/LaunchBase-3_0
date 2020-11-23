const { age, date } = require("../../lib/utils");

module.exports = {
  //index
  index(req, res) {
    return res.render("members/index");
  },

  // create
  create(req, res) {
    return res.render("members/create");
  },

  // post
  post(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    return;
  },

  //show
  show(req, res) {
    return;
  },

  //edit
  edit(req, res) {
    return;
  },

  //put
  put(req, res) {
    const keys = Object.keys(req.body);

    for (key of keys) {
      if (req.body[key] == "") {
        return res.send("Please, fill all fields");
      }
    }

    return;
  },

  //delete
  delete(req, res) {
    return;
  },
};

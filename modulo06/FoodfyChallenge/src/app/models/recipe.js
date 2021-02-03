const { date } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  all(callback) {
    db.query(
      `
      SELECT recipes.*, chefs.name as chef_name
      FROM recipes 
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      ORDER BY title ASC`,
      function (err, results) {
        if (err) {
          throw `Database error: ${err}`;
        }
        callback(results.rows);
      }
    );
  },
  create(data, callback) {
    const query = `
      INSERT INTO recipes (
        title, 
        image_url,
        ingredients,
        preparation,
        information,
        chef_id,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;

    const values = [
      data.title,
      data.image_url,
      data.ingredients,
      data.preparation,
      data.information,
      data.chef_id,
      date(Date.now()).iso,
    ];

    db.query(query, values, function (err, results) {
      if (err) {
        throw `Database error: ${err}`;
      }

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(
      `SELECT recipes.*, chefs.name as chef_name
      FROM recipes 
      LEFT JOIN chefs ON (recipes.chef_id = chefs.id)
      WHERE recipes.id=$1`,
      [id],
      function (err, results) {
        if (err) {
          throw `Database error: ${err}`;
        }
        callback(results.rows[0]);
      }
    );
  },
  findBy(filter, callback) {},
  update(data, callback) {
    const query = `
    UPDATE recipes SET
      title=($1), 
      image_url=($2),
      ingredients=($3),
      preparation=($4),
      information=($5),
      chef_id=($6)
    WHERE id= $7
    `;

    const values = [
      data.title,
      data.image_url,
      data.ingredients,
      data.preparation,
      data.information,
      data.chef_id,
      data.id,
    ];
    db.query(query, values, function (err, results) {
      if (err) {
        throw `Database error: ${err}`;
      }
      callback();
    });
  },
  delete(id, callback) {
    db.query(
      `DELETE FROM recipes WHERE id = $1`,
      [id],
      function (err, results) {
        if (err) {
          throw `Database error: ${err}`;
        }
        return callback();
      }
    );
  },
  chefsSelectOptions(callback) {
    db.query("SELECT name, id FROM chefs", function (err, results) {
      if (err) {
        throw `Database error: ${err}`;
      }
      callback(results.rows);
    });
  },
  paginate(params) {},
};

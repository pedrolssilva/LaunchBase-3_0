const { date } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  all(callback) {
    db.query(
      `
      SELECT *
      FROM chefs
      ORDER BY name ASC`,
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
      INSERT INTO chefs (
        name, 
        avatar_url,
        created_at
      ) VALUES ($1, $2, $3)
      RETURNING id
    `;

    const values = [data.name, data.avatar_url, date(Date.now()).iso];

    db.query(query, values, function (err, results) {
      if (err) {
        throw `Database error: ${err}`;
      }

      callback(results.rows[0]);
    });
  },
  find(id, callback) {
    db.query(
      `SELECT *,
        (
          SELECT count(*) 
          FROM recipes 
          WHERE chef_id=$1) AS total_recipes 
      FROM chefs 
      WHERE chefs.id=$1`,
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
  update(data, callback) {},
  delete(id, callback) {
    db.query(`DELETE FROM chefs WHERE id = $1`, [id], function (err, results) {
      if (err) {
        throw `Database error: ${err}`;
      }
      return callback();
    });
  },
  paginate(params) {},
};

const { date } = require("../../lib/utils");
const db = require("../../config/db");

module.exports = {
  all(callback) {
    db.query(
      `
    SELECT * 
    FROM students 
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
      INSERT INTO students   (
        avatar_url,
        name,
        email,
        birth,
        school_phase,
        workload,
        created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id
    `;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.school_phase,
      data.workload,
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
      `SELECT * 
      FROM students 
      WHERE id=$1`,
      [id],
      function (err, results) {
        if (err) {
          throw `Database error: ${err}`;
        }
        callback(results.rows[0]);
      }
    );
  },
  update(data, callback) {
    const query = `
    UPDATE students SET 
      avatar_url=($1),
      name=($2),
      email=($3),
      birth=($4),
      school_phase=($5),
      workload=($6)
    WHERE id = $7
    `;

    const values = [
      data.avatar_url,
      data.name,
      data.email,
      date(data.birth).iso,
      data.school_phase,
      data.workload,
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
      `DELETE FROM students WHERE id = $1`,
      [id],
      function (err, results) {
        if (err) {
          throw `Database error: ${err}`;
        }
        return callback();
      }
    );
  },
};

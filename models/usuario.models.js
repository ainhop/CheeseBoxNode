const create = ({ nombre, apellidos, username, email, password, imagen }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into usuarios (nombre, apellidos, username, email, password, imagen) values (?, ?, ?, ?, ?, ?)",
      [nombre, apellidos, username, email, password, imagen],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const getById = (pUsuarioId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from usuarios where id = ?",
      [pUsuarioId],
      (err, rows) => {
        if (err) reject(err);
        // if (rows.length !== 1) resolve(null);
        resolve(rows[0]);
      }
    );
  });
};

const deleteById = (pUsuarioId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from usuarios where id = ?",
      [pUsuarioId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};
const update = (
  pUsuarioId,
  { nombre, apellidos, username, email, password, imagen }
) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE usuarios SET nombre = ?, apellidos = ?, username = ?, email = ?, password = ?, imagen = ? where id = ?",
      [nombre, apellidos, username, email, password, imagen, pUsuarioId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const getByEmail = (pEmail) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from usuarios where email = ?",
      [pEmail],
      (err, rows) => {
        console.log(rows);
        if (err) reject(err);

        if (rows.length === 0) resolve(null);
        resolve(rows[0]);
      }
    );
  });
};

module.exports = { create, getById, deleteById, update, getByEmail };

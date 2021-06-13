// Métodos para acceder a la base de datos de la tabla usuarios

// obtener todos los usuarios
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from usuarios", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

// añadir usuario
const create = ({ nombre, apellidos, username, email, password }) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into usuarios (nombre, apellidos, username, email, password) values (?, ?, ?, ?, ?)",
      [nombre, apellidos, username, email, password],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

// obtener usuario según ID
const getById = (pUsuarioId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from usuarios where id = ?",
      [pUsuarioId],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
        // ¿necesario resolver a 'null'?
      }
    );
  });
};

module.exports = { create, getAll, getById };

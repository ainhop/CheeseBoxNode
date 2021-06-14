// Métodos para acceder a la base de datos de la tabla recetas

// obtener todas las recetas
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from recetas", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

const create = ({
  nombre,
  quesoUtilizado,
  ingredientes,
  tiempo,
  raciones,
  elaboracion,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into recetas (nombre, quesoUtilizado, ingredientes, tiempo, raciones, elaboracion) values (?, ?, ?, ?, ?, ?)",
      [nombre, quesoUtilizado, ingredientes, tiempo, raciones, elaboracion],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const getById = (pId) => {
  return new Promise((resolve, reject) => {
    db.query("select * from recetas where id = ?", [pId], (err, rows) => {
      if (err) reject(err);
      if (rows.length !== 1) resolve(null);
      resolve(rows[0]);
    });
  });
};

const update = (
  pRecetaId,
  { nombre, quesoUtilizado, ingredientes, tiempo, raciones, elaboracion }
) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE recetas SET nombre = ?, quesoUtilizado = ?, ingredientes = ?, tiempo = ?, raciones = ?, elaboracion = ? WHERE id = ?",
      [
        nombre,
        quesoUtilizado,
        ingredientes,
        tiempo,
        raciones,
        elaboracion,
        pRecetaId,
      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

const deleteById = (pRecetaId) => {
  return new Promise((resolve, reject) => {
    db.query("delete from recetas where id = ?", [pRecetaId], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteById,
};

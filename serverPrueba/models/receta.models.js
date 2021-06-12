// Métodos para acceder a la base de datos de la tabla recetas

// obtener todas las recetas
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from recetas"),
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      };
  });
};

// Métodos para acceder a la base de datos de productos

// obtener todos los productos
const getAll = () => {
  return new Promise((resolve, reject) => {
    db.query("select * from productos", (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
};

module.exports = { getAll };

// productos de usuario

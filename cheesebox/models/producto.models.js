// Métodos para acceder a la base de datos de productos

// const getAll = () => {
//   return new Promise((resolve, reject) => {
//     db.query("select * from productos", (err, rows) => {
//       if (err) reject(err);
//       resolve(rows);
//     });
//   });
// };

// obtener todos los productos. limitado por páginas

const getAll = (limit, page) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from productos limit ?, ?",
      [limit * (page - 1), limit],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

// crear productos
const create = ({
  nombre,
  descripcion,
  tipoLeche,
  origen,
  curiosidades,
  color,
  tipo,
  imagen,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into productos (nombre, descripcion, tipoLeche, origen, curiosidades, color, tipo, imagen) values (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombre,
        descripcion,
        tipoLeche,
        origen,
        curiosidades,
        color,
        tipo,
        imagen,
      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

// obtener producto por id
const getById = (pProductoId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from productos where id = ?",
      [pProductoId],
      (err, rows) => {
        if (err) reject(err);
        // if (rows.length !== 1) resolve(null);
        resolve(rows[0]);
      }
    );
  });
};

// borrar un producto
const deleteById = (pProductoId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from productos where id = ?",
      [pProductoId],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

// actualizar un producto
const update = (
  pProductoId,
  { nombre, descripcion, tipoLeche, origen, curiosidades, color, tipo }
) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE productos SET nombre = ?, descripcion = ?, tipoLeche = ?, origen = ?, curiosidades = ?, color = ?, tipo = ? where id = ?",
      [
        nombre,
        descripcion,
        tipoLeche,
        origen,
        curiosidades,
        color,
        tipo,
        pProductoId,
      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = { getAll, create, getById, deleteById, update };

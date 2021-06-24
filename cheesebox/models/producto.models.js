// Métodos para acceder a la base de datos de productos

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
  fk_usuario,
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into productos (nombre, descripcion, tipoLeche, origen, curiosidades, color, tipo, imagen, fk_usuario) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nombre,
        descripcion,
        tipoLeche,
        origen,
        curiosidades,
        color,
        tipo,
        imagen,
        fk_usuario,
      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

// crear receta favorita
const createFav = (fk_usuario, fk_productos) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO tbi_usuarios_productos (fk_usuarios, fk_productos) values (?, ?)",
      [fk_usuario, fk_productos],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

// obtener recetas favoritas
const getFav = (pProductoId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM productos as p, tbi_usuarios_productos as tbi WHERE tbi.fk_usuarios = ? AND tbi.fk_productos = r.id",
      [pProductoId],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
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

const getByItem = (pValor) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM cheesebox.productos WHERE nombre LIKE '%${pValor}%' or descripcion LIKE '%${pValor}%'`,
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  update,
  getByItem,
  createFav,
  getFav,
};

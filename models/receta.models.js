// Métodos para acceder a la base de datos de la tabla recetas

// obtener todas las recetas. limitado por páginas
const getAll = (limit, page) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select * from recetas limit ?, ?",
      [limit * (page - 1), limit],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

const create = ({
  nombre,
  quesoUtilizado,
  tiempo,
  raciones,
  ingredientes,
  elaboracion,
  imagen,
  fk_usuario
}) => {
  return new Promise((resolve, reject) => {
    db.query(
      "insert into recetas ( nombre, quesoUtilizado, tiempo, raciones, ingredientes, elaboracion, imagen, fk_usuario) values (?, ?, ?, ?, ?, ?, ?,?)",
      [
        nombre,
        quesoUtilizado,
        tiempo,
        raciones,
        ingredientes,
        elaboracion,
        imagen,
        fk_usuario
      ],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

// crear receta favorita
const createFav = (fk_usuario, fk_recetas) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO tbi_usuarios_recetas (fk_usuarios, fk_recetas) values (?, ?)",
      [fk_usuario, fk_recetas],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

// obtener recetas favoritas
const getFav = (pRecetaId) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM recetas as r, tbi_usuarios_recetas as tbi WHERE tbi.fk_usuarios = ? AND tbi.fk_recetas = r.id",
      [pRecetaId],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

const getByItem = (pValor) => {
    return new Promise((resolve, reject) => {
  
      db.query(`SELECT * FROM cheesebox.recetas WHERE nombre LIKE '%${pValor}%' or ingredientes LIKE '%${pValor}%' or elaboracion LIKE '%${pValor}%';`, (err, result) => {
        if (err) reject(result);
        resolve(result);
      }
    );
  });
};

const getById = (pId) => {
  return new Promise((resolve, reject) => {
    db.query("select * from recetas where id = ?",
      [pId],
      (err, rows) => {
      if (err) reject(err);
      // if (rows.length !== 1) resolve(null);
      resolve(rows[0]);
    });
  });
};

const update = (
  pRecetaId,
  {
    nombre,
    quesoUtilizado,
    ingredientes,
    tiempo,
    raciones,
    elaboracion,
    imagen
    
  }
) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE recetas SET nombre = ?, quesoUtilizado = ?, ingredientes = ?, tiempo = ?, raciones = ?, elaboracion = ?, imagen = ? WHERE id = ?",
      [
        nombre,
        quesoUtilizado,
        ingredientes,
        tiempo,
        raciones,
        elaboracion,
        imagen,
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

const deleteFav = (fk_usuario, fk_recetas)  => {
  return new Promise((resolve, reject) => {
    db.query(
      "delete from tbi_usuarios_recetas where fk_usuarios = ? and fk_recetas = ?",
      [fk_usuario, fk_recetas],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};


const checkFav = (fk_usuario, fk_recetas) => {
  return new Promise((resolve, reject) => {
    db.query("select * FROM tbi_usuarios_recetas where fk_usuarios = ? and fk_recetas = ?",
      [fk_usuario, fk_recetas],
      (err, rows) => {
        if (err) reject(err);
        if (rows.length === 1) resolve(true)
        resolve(false)
      })
  })
}

const showEdit = (fk_usuario) => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM cheesebox.recetas where fk_usuario = ?",
      [fk_usuario],
      (err, rows) => {
        if (err) reject(err);
        resolve(rows);
      }
    );
  });
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteById,
  getByItem,
  createFav,
  getFav,
  deleteFav,
  checkFav,
  showEdit
};

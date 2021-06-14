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

const create = ({
  nombre,
  descripcion,
  tipoLeche,
  origen,
  curiosidades,
  color,
  tipo
}) => {
  return new Promise((resolve, reject) => {
      db.query('insert into productos (nombre, descripcion, tipoLeche, origen, curiosidades, color, tipo) values (?, ?, ?, ?, ?, ?, ?)', [ nombre, descripcion, tipoLeche, origen, curiosidades, color, tipo], (err, result) => {
          if (err) reject(err);
          resolve(result);
      });
  });
}

const getById = (pProductoId) => {
  return new Promise((resolve, reject) => {
      db.query('select * from productos where id = ?', [pProductoId], (err, rows) => {
          if (err) reject(err);
          // if (rows.length !== 1) resolve(null);
          resolve(rows[0]);
      })
  });
}

const deleteById = (pProductoId) => {

  return new Promise((resolve, reject) => {
      
      db.query('delete from productos where id = ?', [pProductoId], (err, result) => {
          
          if (err) reject(err);
          resolve(result)
      });
  });
  
}
const update = (pProductoId, { nombre, descripcion, tipoLeche, origen, curiosidades, color, tipo}) => {
    
  return new Promise((resolve, reject) => {
      db.query(
          'UPDATE productos SET nombre = ?, descripcion = ?, tipoLeche = ?, origen = ?, curiosidades = ?, color = ?, tipo = ? where id = ?',
          [nombre, descripcion, tipoLeche, origen, curiosidades, color, tipo, pProductoId],
          (err, result) => {
              if (err) reject(err);
              resolve(result);
          });
  });
}


module.exports = { getAll, create, getById, deleteById, update };

// productos de usuario

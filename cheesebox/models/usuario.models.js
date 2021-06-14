const create = ({
  nombre, apellidos, username, email, password
}) => {
  return new Promise((resolve, reject) => {
      db.query('insert into productos (nombre, apellidos, username, email, password) values (?, ?, ?, ?, ?)', [ nombre, apellidos, username, email, password], (err, result) => {
          if (err) reject(err);
          resolve(result);
      });
  });
}



const deleteById = (pUsuarioId) => {

  return new Promise((resolve, reject) => {
      
      db.query('delete from usuarios where id = ?', [pUsuarioId], (err, result) => {
          
          if (err) reject(err);
          resolve(result)
      });
  });
  
}
const update = (pUsuarioId, { nombre, apellidos, username, email, password }) => {
    
  return new Promise((resolve, reject) => {
      db.query(
          'UPDATE usuarios SET nombre = ?, apellidos = ?, username = ?, email = ?, password = ? where id = ?',
          [nombre, apellidos, username, email, password, pUsuarioId],
          (err, result) => {
              if (err) reject(err);
              resolve(result);
          });
  });
}


module.exports = { create, deleteById, update };

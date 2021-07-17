// const getByItem = (pValor) => {
//   return new Promise((resolve, reject) => {
//     db.query(`SELECT * FROM cheesebox.productos WHERE nombre LIKE '%\?%' or descripcion LIKE '%\?%';`, [pValor], (err, result) => {
//       if (err) reject(result);
//       resolve(result);
//     });
//   });
// };


const getByItem = (pValor) => {
console.log(pValor)
  return new Promise((resolve, reject) => {

    db.query(`SELECT * FROM cheesebox.productos WHERE nombre LIKE '%${pValor}%' or descripcion LIKE '%${pValor}%'`, (err, result) => {
      if (err) reject(result);
      resolve(result);
    });
  })
};

module.exports = {
  getByItem
};


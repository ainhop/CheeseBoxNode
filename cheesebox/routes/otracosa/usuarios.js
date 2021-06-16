const { getByEmail } = require("../../models/usuario.models");

const router = require("express").Router();
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");
// const daysjs = require('daysjs');
const jwt = require("jsonwebtoken");

//
const usuariosUsuariosRouter = require("./usuarios/registro");
router.use("/usuarios", otracosaUsuariosRouter);

router.post(
  "/registro",
  [
    // validadores datos de entrada
    body("nombre", "tienes que incluir tu nombre").isLength({ min: 3 }),
    body("email", "tu email debe tener el formato correcto").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const usuario = await getByEmail(req.body.email);

    // si el usuario existe
    if (usuario) {
      return res.json({ error: "El email ya está registrado" });
    }

    req.body.password = bcrypt.hasSync(req.body.password, 10);

    create(req.body)
      .then((result) => res.json(result))
      .catch((error) => console.log(error));
  }
);

router.post("/login"),
  async (req, res) => {
    const usuario = await getByEmail(req.body.email);
    if (!usuario) {
      return res.json({ error: "error en email - password 1" });
    }
    const iguales = bcrypt.compareSync(req.body.password, usuario.password);
    // la password que pone cuando se logea, la password que está encriptada

    if (same) {
      res.json({ success: "correcto", token: createToken(usuario) });
    } else {
      res.json({ error: "error en email - password 2" });
    }
  };

function createToken(pUsuario) {
  // retorna en token.

  const obj = {
    usuario_id: pUsuario.id,
    // caducidad: dayjs().add(7, 'days').unix()
  };
  return jwt.sign(obj, "un string");
  // de manera síncrona los datos que se quiere. recibe un string como primer parámetro, un string como segundo
}

module.exports = router;

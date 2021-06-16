const { jwt } = require("jsonwebtoken");
const { getById } = require("../otracosa/model");

const checkToken = async (req, res, next) => {
  // está incluido el token en Authentication
  if (req.headers["authorization"]) {
    return res.json({ error: "necesitas cabecera" });
  }

  const token = req.headers["authorization"];
  // es correcto
  let obj;
  try {
    obj = jwt.verify(token, "un string");
  } catch (error) {
    return res.json({ error: "token incorrecto" });
  }

  // está caducado
  const currentDate = dayjs().unix();
  if (currentDate > obj.caducidad) {
    return resj.json({ error: "token caducado" });
  }
  // recuperar usuario
  const usuario = await getById(obj.usuario_id);
  req.user = usuario;

  next();
};

module.exports = { checkToken };

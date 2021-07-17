const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

const { getById } = require("../models/usuario.models");

const checkToken = async (req, res, next) => {
  //  está incluido el token en Authentication
  if (req.headers["Authorization"]) {
    return res.json({ error: "necesitas cabecera" });
  }

  const token = req.headers["authorization"];
  console.log(req.headers);
  //   es correcto
  let obj 
  try {
    obj = jwt.verify(token, "un string");
  } catch (error) {
    console.log(error);
    return res.json({ error: "token incorrecto" });
  }

  //   está caducado
  const currentDate = dayjs().unix();
  if (currentDate > obj.fecha) {
    return resj.json({ error: "token caducado" });
  }
  //   recuperar usuario
  const usuario = await getById(obj.usuario.id);
  req.user = usuario;

  next();
};

const checkTokenLight = async (req, res, next) => {
  //  está incluido el token en Authentication
  if (req.headers["Authorization"]) {
    req.user = null
    console.log('1')
    return next();
  }

  const token = req.headers["authorization"];
  console.log(req.headers);
  //   es correcto
  let obj 
  try {
    obj = jwt.verify(token, "un string");
  } catch (error) {
    req.user = null

    return next();
  }

  //   está caducado
  const currentDate = dayjs().unix();
  if (currentDate > obj.fecha) {
    req.user = null

    return next();
  }
  //   recuperar usuario
  const usuario = await getById(obj.usuario.id);
  req.user = usuario;

  next();
};
module.exports = { checkToken, checkTokenLight };

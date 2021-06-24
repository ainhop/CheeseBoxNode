var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const dayjs = require("dayjs");
const jwt = require("jsonwebtoken");

const {
  create,
  deleteById,
  update,
  getById,
  getByEmail,
} = require("../models/usuario.models");

const path = require("path");
const fs = require("fs");
const multer = require("multer");
const { checkToken } = require("../middlewares/middleware");
const upload = multer({ dest: "public/images/usuarios/" });

function validate(body) {
  if (body.nombre === "") {
    return {
      error: "The name is empty",
    };
  }

  return { ...body };
}

router.get("/test", checkToken, (req, res) => {
  console.log("el token es válido");

  res.json("ok");
});

router.post("/create", upload.single("imagen"), async (req, res) => {
  try {
    const extension = "." + req.file.mimetype.split("/")[1];
    const newName =
      "http://localhost:3000/images/usuarios/" + req.file.filename + extension;
    const newPath = req.file.path + extension;
    fs.renameSync(req.file.path, newPath);
    req.body.imagen = newName;
    console.log(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: erros.array() });
    }

    const body = validate(req.body);

    if (body.error) {
      return res.status(400).json(body.error);
    }

    const usuario = await getByEmail(req.body.email);

    if (usuario) {
      return res.status(400).json({ error: "el email está registrado" });
    }

    req.body.password = bcrypt.hashSync(req.body.password, 8);

    const result = await create(req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.put("/update/:usuarioId", async (req, res) => {
  try {
    const result = await update(req.params.usuarioId, req.body);
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

router.get("/:usuarioId", async (req, res) => {
  try {
    const usuario = await getById(req.params.usuarioId);
    if (usuario) {
      res.json(usuario);
    } else {
      ("el id no existe");
    }
  } catch (error) {
    res.json("error");
  }
});

router.delete("/delete/:usuarioId", async (req, res) => {
  const result = await deleteById(req.params.usuarioId);
  res.json(result);
});

router.get("/", function (req, res, next) {
  res.json("Usuarios");
});

router.post("/registro", (req, res) => {
  create(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/login", async (req, res) => {
  const emailValid = req.body.email.match(
    /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
  );
  if (!emailValid) {
    return res.status(400).json({ error: "el email no es válido" });
  }

  const usuario = await getByEmail(req.body.email);
  if (!usuario) {
    return res.json({ error: "error en email o password" });
  }
  const same = bcrypt.compareSync(req.body.password, usuario.password);

  if (same) {
    return res.json({ success: "correcto", token: createToken(usuario) });
  }
  res.json({ error: "error en email o password" });
});

function createToken(usuario) {
  // retorna en token

  const obj = {
    usuario: {
      id: usuario.id,
      email: usuario.email,
    },
    caducidad: dayjs().add(7, "minutes").unix(),
  };
  return jwt.sign(obj, "un string");
}

module.exports = router;

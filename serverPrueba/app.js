const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const mysql = require("mysql");

// para las fotos

// const fs= require('fs'); (filesystem, que permite guardar los archivos en el servidor)
// const multer = require('multer');
// const upload = multer({dest: 'public/images'})

// app.listen(3000, () => {
//   console.log(`Servidor escuchando en el puerto 3000`)
// })

// multer colocado antes del manejador final.
// en index.js / app.js
// app.post('/upload', upload.single('imagen'), (req, res) => {
//   res.send('check imagen');
// })

require("dotenv").config();
require("./dbConfing");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const productosRouter = require("./routes/productos");
const usuariosRouter = require("./routes/usuarios");
const recetasRouter = require("./routes/recetas");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/productos", productosRouter);
app.use("/usuarios", usuariosRouter);
app.use("/recetas", recetasRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

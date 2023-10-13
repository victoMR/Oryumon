var ruta = require("express").Router(); //variable de ruta
var {
  mostrarUsuarios,
  nuevoUsuario,
  modificarUsuario,
  buscarPorID,
  borrarUsuario,
} = require("../database/usuariosBD");
//middleware para subir archivos
var subirArchivo = require("../middlewares/subirArchivo");
const {
  encriptarPassword,
  compararPassword,
} = require("../middlewares/funcionesPassword");
const fs = require("fs").promises;
//middleware para borrar archivos
//PRINCIPAL
ruta.get("/", async (req, res) => {
  //req y res las declaramos aqui, see pueden llamar distinto
  var usuarios = await mostrarUsuarios();
  res.render("usuarios/mostrar", { usuarios });
});
// NUEVO USR
ruta.get("/nuevousuario", async (req, res) => {
  res.render("usuarios/nuevoUsr");
});
ruta.post("/nuevousuario", subirArchivo(), async (req, res) => {
  req.body.foto = req.file.originalname;
  var error = await nuevoUsuario(req.body);
  res.redirect("/");
});
// EDITAR
ruta.get("/editar/:id", async (req, res) => {
  var usuario = await buscarPorID(req.params.id);
  res.render("usuarios/modificarUsr", { usuario, error: null });
});

ruta.post("/editar", subirArchivo(), async (req, res) => {
  // Buscar usuario por ID
  var usuario = await buscarPorID(req.body.id);

  // Definir la variable de error
  var error = null;

  // Verificar si se proporciona una nueva contraseña en la solicitud
  if (req.body.password) {
    // Si se proporciona una nueva contraseña, encriptar la nueva contraseña
    const { salt, hash } = encriptarPassword(req.body.password);

    // Verificar si la nueva contraseña es la misma que la anterior
    if (compararPassword(req.body.password, usuario.password, usuario.salt)) {
      // Si la nueva contraseña es la misma que la anterior, establecer un mensaje de error
      error = "No puedes usar la misma contraseña que tenías antes";
      res.render("usuarios/modificarUsr", { usuario, error });
    } else {
      // Si la nueva contraseña es diferente, actualizar la contraseña encriptada y la sal
      req.body.password = hash;
      req.body.salt = salt;
      req.body.foto = req.file ? req.file.originalname : usuario.foto; // Actualizar el valor de req.body.foto
      var error = await modificarUsuario(req.body);
      res.redirect("/");
    }
  } else {
    // Si no se proporciona una nueva contraseña, mantener la contraseña y la sal existentes
    req.body.password = usuario.password;
    req.body.salt = usuario.salt;
    req.body.foto = req.file ? req.file.originalname : usuario.foto; // Actualizar el valor de req.body.foto
    var error = await modificarUsuario(req.body);
    res.redirect("/");
  }
});

// ...

// ELIMINAR
ruta.get("/borrar/:id", async (req, res) => {
  var usuario = await buscarPorID(req.params.id); // pordia ser await borrarUsuario(req.params.id);
  console.log(req.params.id);
  res.render("usuarios/eliminarUsr", { usuario }); // res.redirect("/");
});

ruta.post("/borrar", async (req, res) => {
  const userId = req.body.id; // Accede al id desde req.body
  console.log(userId);
  try {
    const user = await buscarPorID(userId);

    if (req.file) {
      req.body.foto = req.file.originalname;
    } else {
      req.body.foto = user.foto; // Mantener la foto existente
    }

    if (!user) {
      return res.status(404).send("Usuario no encontrado");
    }

    await fs.unlink(`./public/uploads/${user.foto}`);
    await borrarUsuario(userId);
    error = 0;

    res.redirect("/");
  } catch (error) {
    console.error("Error al borrar la foto o usuario:", error);
    res.status(500).send("Error al borrar la foto o usuario");
  }
});

module.exports = ruta;

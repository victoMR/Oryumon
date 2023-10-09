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
  res.render("usuarios/modificarUsr", { usuario });
});

ruta.post("/editar", subirArchivo(), async (req, res) => {
  var usuario = await buscarPorID(req.body.id); // Obtener el usuario antes del if
  if (req.file) {
    req.body.foto = req.file.originalname;
  } else {
    req.body.foto = usuario.foto; // Mantener la foto existente
  }
  console.log("*********************");
  console.log(req.body.foto);
  var error = await modificarUsuario(req.body);
  res.redirect("/");
});
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

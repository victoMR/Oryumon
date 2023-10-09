var ruta = require("express").Router(); //variable de ruta
var {
  mostrarUsuarios,
  nuevoUsuario,
  modificarUsuario,
  buscarPorID,
  borrarUsuario,
} = require("../database/usuariosBD");
var subirImagen = require("../middlewares/subirArchivo");
var fs = require('fs');
//PRINCIPAL
ruta.get("/api/mostrarusr", async (req, res) => {
  //req y res las declaramos aqui, see pueden llamar distinto
  var usuarios = await mostrarUsuarios();
  // res.render("usuarios/mostrar",{usuarios});
  if (usuarios.length > 0) {
    res.status(200).json(usuarios);
  } else {
    res.status(400).json("No hay usuarios 🥺");
  }
});
// NUEVO USR
ruta.post("/api/nuevousuario", subirImagen(), async (req, res) => {
  req.body.foto = req.file.originalname;
  var error = await nuevoUsuario(req.body);
  if (error == 0) {
    res.status(200).json("Usuario insertado 🥳");
  } else {
    res.status(400).json("Error al insertar usuario 🥺");
  }
});
// EDITAR
ruta.get("/api/buscarUsuarioPorId/:id", async (req, res) => {
  var usuario = await buscarPorID(req.params.id);
  if (usuario == "") {
    res.status(400).json("No hay usuarios con ese ID 🥺");
  } else {
    res.status(200).json(usuario);
  }
});
ruta.post("/api/editarUsr", subirImagen(), async (req, res) => {
  var usuario = await buscarPorID(req.body.id); // Obtener el usuario antes del if
  if (req.file) {
    req.body.foto = req.file.originalname;
  } else {
    req.body.foto = usuario.foto; // Mantener la foto existente
  }
  var error = await modificarUsuario(req.body);
  console.log("*********************");
  console.log(req.body.foto);
  console.log(req.body);
  console.log("*********************");
  if (error == 0) {
    res.status(200).json("Usuario modificado 🥳");
  } else {
    console.error(error);
    res.status(400).json("Error al modificar usuario 🥺");
  }
});
// ELIMINAR
ruta.get("/api/borrarUsr/:id", async (req, res) => {
  var error = await borrarUsuario(req.params.id);
  if (error == 0) {
    res.status(200).json("Usuario eliminado 🥳");
  } else {
    res.status(400).json("Error al eliminar usuario 🥺");
  }
});
ruta.post("/api/borrarUsr", async (req, res) => {
  var usuario = await buscarPorID(req.params.id);
  if (usuario) {
    var fotoUsuario = usuario.foto;
    fs.unlinkSync("public/img/${fotoUsuario}"); // Borrar la foto
  }
  
  var error = await borrarUsuario(req.params.id);
  if (error == 0) {
    res.status(200).json("Usuario eliminado 🥳");
  } else {
    res.status(400).json("Error al eliminar usuario 🥺");
  }
});

module.exports = ruta;

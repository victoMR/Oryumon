var ruta = require("express").Router(); //variable de ruta
var {
  mostrarUsuarios,
  nuevoUsuario,
  modificarUsuario,
  buscarPorID,
  borrarUsuario,
} = require("../database/usuariosBD");
var subirImagen = require("../middlewares/subirArchivo");
const {
  encriptarPassword,
  compararPassword,
} = require("../middlewares/funcionesPassword");
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
  if (!usuario) {
    res.status(404).json("No hay usuarios con ese ID 🥺");
  } else {
    res.status(200).json(usuario);
  }
});

ruta.post("/api/editarUsr", subirImagen(), async (req, res) => {
  var usuario = await buscarPorID(req.body.id); // Obtener el usuario antes del if

  // Verificar si se proporciona una nueva contraseña en la solicitud
  if (req.body.password) {
    // Si se proporciona una nueva contraseña, encriptar la nueva contraseña
    const { salt, hash } = encriptarPassword(req.body.password);

    // Verificar si la nueva contraseña es la misma que la anterior
    if (compararPassword(req.body.password, usuario.password, usuario.salt)) {
      // Si la nueva contraseña es la misma que la anterior, establecer un mensaje de error
      res.status(400).json("No puedes usar la misma contraseña que tenías antes");
    } else {
      // Si la nueva contraseña es diferente, actualizar la contraseña encriptada y la sal
      req.body.password = hash;
      req.body.salt = salt;
    }
  } else {
    // Si no se proporciona una nueva contraseña, mantener la contraseña y la sal existentes
    req.body.password = usuario.password;
    req.body.salt = usuario.salt;
  }

  // Eliminar la foto existente si se proporciona una nueva foto
  if (req.file) {
    if (usuario.foto) {
      // Eliminar la foto existente
      const rutaFotoExistente = `./public/uploads/${usuario.foto}`;
      fs.unlink(rutaFotoExistente, (err) => {
        if (err) {
          console.error("Error al eliminar la foto existente:", err);
        } else {
          console.log("Foto existente eliminada con éxito");
        }
      });
    }
    req.body.foto = req.file.originalname;
  } else {
    req.body.foto = usuario.foto; // Mantener la foto existente
  }

  var error = await modificarUsuario(req.body);

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

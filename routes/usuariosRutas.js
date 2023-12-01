var ruta = require("express").Router(); //variable de ruta
var {
  mostrarUsuarios,
  nuevoUsuario,
  nuevoTrabajador,
  modificarUsuario,
  buscarPorID,
  borrarUsuario,
  buscarPorUsuario,
} = require("../database/usuariosBD");
//middleware para subir archivos
var subirArchivo = require("../middlewares/subirArchivo");
const {
  encriptarPassword,
  compararPassword,
  autorizado,
} = require("../middlewares/funcionesPassword");
const fs = require("fs").promises;
//middleware para borrar archivos
//PRINCIPAL
ruta.get("/usuarios",autorizado, async (req, res) => {
  try {
    // Lógica para obtener los usuarios
    var usuarios = await mostrarUsuarios();
    res.render("usuarios/mostrar", { usuarios: usuarios }); // Pasa los usuarios a la plantilla
  } catch (error) {
    console.log("Error al obtener usuarios: " + error);
    res.render("login/login", { mensaje: "No has iniciado sesion" });
  }
});

// NUEVO USR
ruta.get("/usuarios/nuevousuario", async (req, res) => {
  res.render("usuarios/nuevoUsr");
});
ruta.post("/usuarios/nuevousuario", subirArchivo(), async (req, res) => {
  req.body.foto = req.file.originalname;
  var error = await nuevoUsuario(req.body);
  res.redirect("/");
});

ruta.get("/usuarios/nuevotrajador", autorizado, async (req, res) => {
  res.render("usuarios/nuevoTrabajador");
});

ruta.post("/usuarios/nuevotrajador", subirArchivo(), async (req, res) => {
  req.body.foto = req.file.originalname;
  var error = await nuevoTrabajador(req.body);
  res.redirect("/principalTienda");
});

// EDITAR
ruta.get("/usuarios/editar/:id",autorizado, async (req, res) => {
  try {
    const usuario = await buscarPorID(req.params.id);
    res.render("usuarios/modificarUsr", { usuario, error: null });
  }
  catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }

});

ruta.post("/usuarios/editar", subirArchivo(), async (req, res) => {
  // Buscar usuario por ID
  var usuario = await buscarPorID(req.body.id);
  req.body.admin = false; // Establecer el valor predeterminado de adminValue a false
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
      res.redirect("/usuarios/usuarios");
    }
  } else {
    // Si no se proporciona una nueva contraseña, mantener la contraseña y la sal existentes
    req.body.password = usuario.password;
    req.body.salt = usuario.salt;
    req.body.foto = req.file ? req.file.originalname : usuario.foto; // Actualizar el valor de req.body.foto
    var error = await modificarUsuario(req.body);
    res.redirect("/principalTienda");
  }
});

ruta.get("/usuarios/editarEmpresa/:id", autorizado, async (req, res) => {
  try {
    const usuario = await buscarPorID(req.params.id);
    res.render("usuarios/modificarEmpleado", { usuario, error: null });
  }
  catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }

});

ruta.post("/usuarios/editarEmpresa", subirArchivo(), async (req, res) => {
  // Buscar usuario por ID
  var usuario = await buscarPorID(req.body.id);
  req.body.admin = true; // Establecer el valor predeterminado de adminValue a false
  var error = null;

  // Verificar si se proporciona una nueva contraseña en la solicitud
  if (req.body.password) {
    // Si se proporciona una nueva contraseña, encriptar la nueva contraseña
    const { salt, hash } = encriptarPassword(req.body.password);

    // Verificar si la nueva contraseña es la misma que la anterior
    if (compararPassword(req.body.password, usuario.password, usuario.salt)) {
      // Si la nueva contraseña es la misma que la anterior, establecer un mensaje de error
      res.render("usuarios/modificarEmpleado");
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

//eliminar empresa
ruta.get("/usuarios/eliminarEmpresa/:id", autorizado, async (req, res) => {
  try {
    const usuario = await buscarPorID(req.params.id);
    res.render("usuarios/eliminarEmpresa", { usuario, error: null });
  }
  catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }

});

ruta.post("/usuarios/eliminarEmpresa", async (req, res) => {
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

// ELIMINAR
ruta.get("/usuarios/borrar/:id", async (req, res) => {
  var usuario = await buscarPorID(req.params.id); // pordia ser await borrarUsuario(req.params.id);
  console.log(req.params.id);
  res.render("usuarios/eliminarUsr", { usuario }); // res.redirect("/");
});

ruta.post("/usuarios/borrar", autorizado, async (req, res) => {
  try{
    const userId = req.body.id; // Accede al id desde req.body
    console.log(userId);
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
    res.redirect("/usuarios/usuarios");
  } catch (error) {
    console.error("Error al borrar la foto o usuario:", error);
    res.status(500).send("Error al borrar la foto o usuario");
  }
});

module.exports = ruta;

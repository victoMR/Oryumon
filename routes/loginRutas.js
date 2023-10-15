var rutalogin = require("express").Router(); //variable de ruta
var {
  buscarPorUsuario,
  verificarPassword,
  nuevoUsuario,
  mostrarUsuarios,
} = require("../database/usuariosBD");

//middleware para subir archivos
var subirArchivo = require("../middlewares/subirArchivo");
const { encriptarPassword } = require("../middlewares/funcionesPassword");

rutalogin.get("/", async (req, res) => {
  res.render("login/login", { mensaje: null });
});

rutalogin.post("/login", async (req, res) => {
  var { usuario, password } = req.body;
  var usuarioEncontrado = await buscarPorUsuario(usuario);
  if (usuarioEncontrado) {
    var resultado = verificarPassword(
      password,
      usuarioEncontrado.password,
      usuarioEncontrado.salt
    );
    if (resultado) {
      // res.redirect("/usuarios/usuarios");
      res.render("login/mostrarPropiedadesUsr", { usuario: usuarioEncontrado });
    } else {
      res.render("login/login", { mensaje: "Contraseña incorrecta" });
    }
  } else {
    res.render("login/login", { mensaje: "Usuario no encontrado" });
  }
});

// Ruta para mostrar las propiedades del usuario
rutalogin.get("/mostrarPropiedadesUsr", async (req, res) => {
  try {
    // Lógica para obtener el usuario
    var usuarioEncontrado = await buscarPorUsuario(req.body.usuario); // Asegúrate de pasar el usuario o su identificación aquí
    console.log("usuario: ", usuarioEncontrado);
    res.render("login/mostrarPropiedadesUsr", { usuario: usuarioEncontrado }); // Pasa el usuario a la plantilla
  } catch (error) {
    console.log("Error al obtener el usuario: " + error);
    res.render("error", { error: "Error al obtener el usuario" }); // Manejo de errores
  }
});

rutalogin.get("/signup", async (req, res) => {
  res.render("login/signup");
});

rutalogin.post("/signup", subirArchivo(), async (req, res) => {
  req.body.foto = req.file.originalname;
  const { salt, hash } = encriptarPassword(req.body.password);
  req.body.password = hash;
  req.body.salt = salt;
  var error = await nuevoUsuario(req.body);
  res.redirect("/usuarios/usuarios");
});

module.exports = rutalogin;

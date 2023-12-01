var rutalogin = require("express").Router(); //variable de ruta
var {
  mostrarUsuarios,
  buscarPorUsuario,
  verificarPassword,
  nuevoUsuario,
} = require("../database/usuariosBD");

var { mostrarProductos } = require("../database/productosBD");
//middleware para subir archivos
var subirArchivo = require("../middlewares/subirArchivo");
const {
  encriptarPassword,
  autorizado,
  admin,
} = require("../middlewares/funcionesPassword");

rutalogin.get("/", async (req, res) => {
  res.render("login/login", { mensaje: null });
});

rutalogin.post("/login", async (req, res) => {
  var { usuario, password } = req.body;
  var usuarioEncontrado = await buscarPorUsuario(usuario);

  if (usuarioEncontrado) {
    var resultado = await verificarPassword(
      password,
      usuarioEncontrado.password,
      usuarioEncontrado.salt
    );

    if (resultado) {
      if (usuarioEncontrado.admin) {
        const idUsr = usuarioEncontrado.id || usuarioEncontrado._id;
        req.session.admin = req.body.usuario;
        req.session.userId = idUsr;
        res.redirect("/principalTienda");
      } else {
        req.session.usuario = req.body.usuario;
        req.session.userId = usuarioEncontrado._id
          ? usuarioEncontrado._id.toString()
          : null;
        res.redirect("/venta/venta");
      }
    } else {
      res.render("login/login", {
        mensaje: "La contraseña que ingresaste: " + password + " es incorrecta",
      });
    }
  } else {
    res.render("login/login", {
      mensaje: "El usuario: " + usuario + " no existe",
    });
  }
});

rutalogin.get("/logout", async (req, res) => {
  req.session = null;
  res.redirect("/");
});

rutalogin.get("/principalTienda", autorizado, async (req, res) => {
  try {
    const usuarios = await mostrarUsuarios();
    const productos = await mostrarProductos();
    const userId = req.session.userId;
    console.log("userId: ", userId);
    const trabajadores = usuarios.filter((usuario) => !usuario.admin);

    // Agrega la variable 'boton' para identificar la sección activa
    res.render("tienda/principalTienda", {
      usuarios: trabajadores,
      userId: userId,
      productos: productos,
      boton: req.query.boton || "productos", // Si no se proporciona, establece 'productos' como valor predeterminado
    });
  } catch (error) {
    console.log("Error al obtener usuarios y productos: " + error);
    res.render("error", { error: "Error al obtener usuarios y productos" });
  }
});

rutalogin.get("/logout", async (req, res) => {
  req.session = null;
  res.redirect("/");
});

// Ruta para mostrar las propiedades del usuario
rutalogin.get("/mostrarPropiedadesUsr", async (req, res) => {
  console.log("req.session.usuario: ", req.session.usuario);
  if (req.session.usuario == null) {
    res.render("login/login", { mensaje: "No has iniciado sesion" });
  } else {
    try {
      // Lógica para obtener el usuario
      var usuarioEncontrado = await buscarPorUsuario(req.body.usuario); // Asegúrate de pasar el usuario o su identificación aquí
      console.log("usuario: ", usuarioEncontrado);
      res.render("login/mostrarPropiedadesUsr", { usuario: usuarioEncontrado }); // Pasa el usuario a la plantilla
    } catch (error) {
      console.log("Error al obtener el usuario: " + error);
      res.render("error", { error: "Error al obtener el usuario" }); // Manejo de errores
    }
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
  res.render("login/login", { mensaje: "Usuario registrado" });
});
module.exports = rutalogin;

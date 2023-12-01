var conexion = require("./conexion");
// var conexionUsuarios=require("./conexion").conexion;
var Usuario = require("../models/Usuario");

var crypto = require("crypto");

var {
  encriptarPassword,
  compararPassword,
} = require("../middlewares/funcionesPassword");
const { log } = require("console");



async function mostrarUsuarios() {
  var users = [];
  try {
    var usuarios = await conexion.get(); //trae toda la info de la tabla
    usuarios.forEach((usuario) => {
      var user = new Usuario(usuario.id, usuario.data());
      if (user.bandera == 0) {
        users.push(user.ObtenerDatos);
      }
    });
  } catch (err) {
    console.log(
      "Error al recuperar usuarios en la base de datos DE USUARIOS" + err
    );
  }
  return users;
}

async function buscarPorID(id) {
  var user = "";
  console.log(user);
  try {
    var usuario = await conexion.doc(id).get(); // doc como registro en mysql
    var usuarioObjeto = new Usuario(usuario.id, usuario.data());
    if (usuarioObjeto.bandera == 0) {
      user = usuarioObjeto.ObtenerDatos;
    }
  } catch (err) {
    console.log("Error al recuperar al usuario " + err);
  }
  return user;
}

async function nuevoUsuario(datos) {
  var { hash, salt } = encriptarPassword(datos.password);
  datos.password = hash;
  datos.salt = salt;
  datos.admin = true;
  var user = new Usuario(null, datos);
  var error = 1;
  if (user.bandera == 0) {
    try {
      await conexion.doc().set(user.ObtenerDatos);
      console.log("Usuario insertado a la BD");
      error = 0;
    } catch (err) {
      console.log("Error al capturar nuevo usuario" + err);
    }
  }
  return error;
}

async function nuevoTrabajador(datos) {
  var { hash, salt } = encriptarPassword(datos.password);
  datos.password = hash;
  datos.salt = salt;
  datos.admin = false;
  var user = new Usuario(null, datos);
  var error = 1;
  if (user.bandera == 0) {
    try {
      await conexion.doc().set(user.ObtenerDatos);
      console.log("Usuario insertado a la BD");
      error = 0;
    } catch (err) {
      console.log("Error al capturar nuevo usuario" + err);
    }
  }
  return error;
}

async function modificarUsuario(datos) {
  var usuarioBuscar = await buscarPorID(datos.id);
  if (usuarioBuscar != "") {
    var user = new Usuario(datos.id, datos);
    var error = 1;
     console.log(user);
    if (user.bandera == 0) {
      try {
        await conexion.doc(user.id).set(user.ObtenerDatos);
        console.log("Registro actualizado");
        error = 0;
      } catch (err) {
        console.log("Error al modificar usuario" + err);
        throw err; // Lanzar el error para que se propague hacia arriba
      }
    }
  }
  return error;
}

async function borrarUsuario(id) {
  var error = 1;
  var user = await buscarPorID(id);
  if (user != "") {
    try {
      await conexion.doc(id).delete();
      console.log("Registro borrado");
      error = 0;
    } catch (err) {
      console.log("Error al borrar usuario" + err);
    }
  }
  return error;
}

async function buscarPorUsuario(usuario) {
  var user = null; // Inicializar user como null
  try {
    var usuarios = await conexion.where("usuario", "==", usuario).get();
    usuarios.forEach((usuario) => {
      var usuarioObjeto = new Usuario(usuario.id, usuario.data());
      console.log("id " + usuarioObjeto.id);
      if (usuarioObjeto && usuarioObjeto.bandera === 0) {
        // Comprobar si usuarioObjeto no es null o undefined
        user = usuarioObjeto.ObtenerDatos; //
      }
    });
  } catch (err) {
    console.log("Error al recuperar el usuario: " + err);
  }
  return user;
}

async function verificarPassword(password, hash, salt) {
  if (typeof salt !== "string") {
    throw new Error("Salt debe ser una cadena");
  }
  var hashEvaluar = crypto
    .scryptSync(password, salt, 100000, 64, "sha512")
    .toString("hex");
  return hashEvaluar === hash;

}
module.exports = {
  mostrarUsuarios,
  buscarPorID,
  nuevoUsuario,
  nuevoTrabajador,
  modificarUsuario,
  borrarUsuario,
  buscarPorUsuario,
  verificarPassword,
};

var ruta = require("express").Router(); //variable de ruta
var {mostrarUsuarios, nuevoUsuario}=require("../database/usuariosBD");

ruta.get("/", async (req,res)=>{ //req y res las declaramos aqui, see pueden llamar distinto
 var usuarios= await mostrarUsuarios();
  res.render("usuarios/mostrar",{usuarios});
})
ruta.get("/nuevousuario", async (req,res)=>{
  res.render("usuarios/nuevoUsr");
})
ruta.post("/nuevousuario", async (req,res)=>{
  var error= await nuevoUsuario(req.body);
  res.redirect("/");
})
// ruta.get("/mostrar", async (req,res)=>{
//   var usuarios= await mostrarUsuarios();
//   res.render("usuarios/mostrar",{usuarios});
// })
// ruta.get("/usuarios/modificarUsr:id", async (req,res)=>{
//   var usuarios= await mostrarUsuarios();
//   res.render("usuarios/modificarUsr",{id});
// })
module.exports = ruta;
var ruta = require("express").Router(); //variable de ruta
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID}=require("../database/usuariosBD");

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
ruta.get("/editar/:id", async (req,res)=>{
  var usuario= await buscarPorID(req.params.id);
  res.render("usuarios/modificarUsr",{usuario});
})
ruta.get("borrar/:id", async (req,res)=>{
  
})
ruta.post("/editar", async (req,res)=>{
  var error= await modificarUsuario(req.body);
  res.redirect("/");
})
module.exports = ruta;
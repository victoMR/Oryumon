var ruta = require("express").Router(); //variable de ruta
var {mostrarUsuarios, nuevoUsuario, modificarUsuario, buscarPorID, borrarUsuario}=require("../database/usuariosBD");

//PRINCIPAL
ruta.get("/api/mostrarusr", async (req,res)=>{ //req y res las declaramos aqui, see pueden llamar distinto
 var usuarios= await mostrarUsuarios();
  // res.render("usuarios/mostrar",{usuarios});
  if(usuarios.length>0){
    res.status(200).json(usuarios);
  }else{
    res.status(400).json("No hay usuarios 🥺");
  }
});
// NUEVO USR
ruta.post("/api/nuevousuario", async (req,res)=>{
  var error= await nuevoUsuario(req.body);
  if(error==0){
    res.status(200).json("Usuario insertado 🥳");
  }else{
    res.status(400).json("Error al insertar usuario 🥺");
  }
});
// EDITAR
ruta.get("/api/buscarUsuarioPorId/:id", async (req,res)=>{
  var usuario= await buscarPorID(req.params.id);
  if(usuario==""){
    res.status(400).json("No hay usuarios con ese ID 🥺");
  }else{
    res.status(200).json(usuario); 
  }
});
ruta.post("/api/editarUsr", async (req,res)=>{
  var error= await modificarUsuario(req.body);
  if(error==0){
    res.status(200).json("Usuario modificado 🥳");
  }else{
    res.status(400).json("Error al modificar usuario 🥺");
  }
});
// ELIMINAR
ruta.get("/api/borrarUsr/:id", async (req,res)=>{
  var error= await borrarUsuario(req.params.id);
  if(error==0){
    res.status(200).json("Usuario eliminado 🥳");
  }
  else{
    res.status(400).json("Error al eliminar usuario 🥺");
  }
});
ruta.post("/api/borrarUsr", async (req,res)=>{
  var error= await borrarUsuario(req.params.id);
  if(error==0){
    res.status(200).json("Usuario eliminado 🥳");
  }
  else{
    res.status(400).json("Error al eliminar usuario 🥺");
  }
});

module.exports = ruta;
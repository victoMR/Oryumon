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
ruta.get("/nuevousuario", async (req,res)=>{
  res.render("usuarios/nuevoUsr");
})
ruta.post("/nuevousuario", async (req,res)=>{
  var error= await nuevoUsuario(req.body);
  res.redirect("/");
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
ruta.post("/editar", async (req,res)=>{
  var error= await modificarUsuario(req.body);
  res.redirect("/");
});
// ELIMINAR
ruta.get("/borrar/:id", async (req,res)=>{
  var usuario= await buscarPorID(req.params.id); // pordia ser await borrarUsuario(req.params.id);
  res.render("usuarios/eliminarUsr",{usuario});  // res.redirect("/");
});
ruta.post("/borrar", async (req,res)=>{
  await borrarUsuario(req.body.id);
  res.redirect("/");
});

module.exports = ruta;
var conexion=require("./conexion");
var Usuario=require("../models/Usuario");

async function mostrarUsuarios(){
    var users=[];
    try{ 
        var usuarios= await conexion.get(); //trae toda la info de la tabla
        usuarios.forEach(usuario => {
            //nuevas cosas
            var user=new Usuario(usuario.id, usuario.data());
            if(user.bandera==0){
                users.push(user.obtenerData);
            }
        });
        
    }
    catch(err){
        console.log("Error al recuperar usuarios en la base de datos"+err);
    }
    return users;
}

async function buscarPorID(id){
    var user="";
    try{
        var usuario=await conexion.doc(id).get(); // doc como registro en mysql
        var usuarioObjeto=new Usuario(usuario.id, usuario.data());
        if(usuarioObjeto.bandera==0){
            user=usuarioObjeto.obtenerData;
        }
    }
    catch(err){
        console.log("Error al recuperar al usuario"+err);
    }
    return user; 
}

async function nuevoUsuario(datos){
    var user=new Usuario(null, datos);
    var error=1;
        if(user.bandera==0){
            try{
                await conexion.doc().set(user.obtenerData); 
                console.log("Usuario insertado a la BD");
                error=0;
            }
            catch(err){
                console.log("Error al capturar nuevo usuario"+err);
            }
        }
        return error;
}


async function modificarUsuario( datos){
    var user=new Usuario(datos.id, datos);
    var error=1;
    if (user.bandera==0){
        try{

            await conexion.doc(user.id).set(user.obtenerData); 
            console.log("Registro acualizado");
            error=0;
        }catch(err){
            console.log("Error al modificar usuario"+err);
        }
    }
    return error; 
}

async function borrarUsuario(id) {
    try{
        await conexion.doc(id).delete();
        console.log("Registro borrado");
    }
    catch(err){
        console.log("Error al borrar usuario"+err);
    }
    
}

module.exports={
    mostrarUsuarios,
    buscarPorID,
    nuevoUsuario,
    modificarUsuario,
    borrarUsuario
}
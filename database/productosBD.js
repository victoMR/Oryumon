var conexion=require("./conexion");
var Producto=require("../models/Productos");

async function mostrarProductos() {
    var productos = [];
    try {
        var productosObtenidos = await conexion.get();
        if (productosObtenidos) {
            productosObtenidos.forEach(producto => {
                var productoInstancia = new Producto(producto.id, producto.data());
                if (productoInstancia.bandera == 0) {
                    productos.push(productoInstancia.obtenerData);
                }
            });
        }
    } catch (err) {
        console.log("Error al recuperar productos en la base de datos" + err);
    }
    return productos;
}

async function nuevoProducto(datos) {
    var producto = new Producto(null, datos);
    var error = 1;
    if (producto && producto.bandera == 0) {
        try {
            await conexion.doc().set(producto.obtenerData);
            console.log("Producto insertado a la BD");
            error = 0;
        } catch (err) {
            console.log("Error al capturar nuevo producto" + err);
        }
    }
    return error;
}

async function buscarPorIDPro(id){
    var producto="";
    try{
        var producto=await conexion.doc(id).get();
        var productoObjeto=new Producto(producto.id, producto.data());
        if(productoObjeto.bandera==0){
            producto=productoObjeto.obtenerData;
        }
    }
    catch(err){
        console.log("Error al recuperar al producto"+err);
    }
    return producto;
}

async function nuevoProducto(datos){
    var producto=new Producto(null, datos);
    var error=1;
        if(producto.bandera==0){
            try{
                await conexion.doc().set(producto.obtenerData);
                console.log("Producto insertado a la BD");
                error=0;
            }
            catch(err){
                console.log("Error al capturar nuevo producto"+err);
            }
        }
        return error;
}

async function modificarProducto( datos){
    var producto=new Producto(datos.id, datos);
    var error=1;
    if (producto.bandera==0){
        try{
            await conexion.doc(producto.id).update(producto.obtenerData);
            console.log("Producto actualizado en la BD");
            error=0;
        }
        catch(err){
            console.log("Error al actualizar producto"+err);
        }
    }
    return error;
}

async function borrarProducto(id){
    var error=1;
    try{
        await conexion.doc(id).delete();
        console.log("Producto eliminado de la BD");
        error=0;
    }
    catch(err){
        console.log("Error al eliminar producto"+err);
    }
    return error;
}

module.exports={mostrarProductos, buscarPorIDPro, nuevoProducto, modificarProducto, borrarProducto};
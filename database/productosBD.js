var conexion = require("./conexionProBD");
// var conexion=require("./conexion").conexionProductos;
var Producto = require("../models/Productos");

async function mostrarProductos() {
  var productos = [];
  try {
    var productosObtenidos = await conexion.get();
    if (productosObtenidos) {
      productosObtenidos.forEach((producto) => {
        var productoInstancia = new Producto(producto.id, producto.data());
        if (productoInstancia.bandera == 0) {
          productos.push(productoInstancia.ObtenerDatos);
        }
      });
    }
  } catch (err) {
    console.log("Error al recuperar productos en la base de datos" + err);
  }
  console.log(productos);
  return productos;
}

async function nuevoProducto(datos) {
  var producto = new Producto(null, datos);
  var error = 1;
  if (producto && producto.bandera == 0) {
    try {
      await conexion.doc().set(producto.ObtenerDatos);
      console.log("Producto insertado a la BD");
      error = 0;
    } catch (err) {
      console.log("Error al capturar nuevo producto" + err);
    }
  }
  return error;
}

async function buscarPorIDPro(id) {
  var producto = "";
  console.log(producto);

  try {
    var productoDoc = await conexion.doc(id).get(); //busca el producto por id
    var productoObjeto = new Producto(productoDoc.id, productoDoc.data());
    if (productoObjeto.bandera == 0) {
      producto = productoObjeto.ObtenerDatos;
    }
  } catch (err) {
    console.log("Error al recuperar al producto" + err);
  }
  return producto;
}

async function buscarPorNombrePro(nombre) {
  var producto = null; //inicio la variable producto

  try {
    var productoDoc = await conexion.where("nombre", "==", nombre).get(); //busca el producto por nombre

    if (productoDoc.exists) {
      producto = new Producto(productoDoc.id, productoDoc.data()); //si lo encuentra

      if (producto.bandera == 0) {
        //si el producto existe y no esta vacio lo retorna
        producto = producto.ObtenerDatos; //retorna el producto
      }
    }
  } catch (err) {
    console.log("Error al recuperar al producto" + err); //si no lo encuentra
  }

  return producto; // retonrna si no encuentra nada
}

async function nuevoProducto(datos) {
  var producto = new Producto(null, datos);
  var error = 1;
  if (producto.bandera == 0) {
    try {
      await conexion.doc().set(producto.ObtenerDatos);
      console.log("Producto insertado a la BD");
      error = 0;
    } catch (err) {
      console.log("Error al capturar nuevo producto" + err);
    }
  }
  return error;
}

async function modificarProducto(datos) {
  console.log(datos);
  var producto = await buscarPorIDPro(datos.id); //busca el producto por id

  if (producto != "") {
    var productoInstancia = new Producto(datos.id, datos);
    var error = 1;

    if (productoInstancia.bandera == 0) {
      try {
        await conexion.doc(datos.id).set(productoInstancia.ObtenerDatos);
        console.log("Producto actualizado en la BD");
        error = 0;
      } catch (err) {
        console.log("Error al actualizar producto" + err);
      }
    }
  } else {
    console.log("Producto no encontrado");
  }

  return error;
}

async function borrarProducto(id) {
  var error = 1;
  var producto = await buscarPorIDPro(id); //busca el producto por id

  if (producto !== null && Object.keys(producto).length > 0) {
    //si el producto existe y no esta vacio lo borra
    try {
      await conexion.doc(id).delete();
      console.log("Producto eliminado de la BD"); //si lo encuentra
      error = 0;
    } catch (err) {
      console.log("Error al eliminar producto" + err); //si no lo encuentra
    }
  } else {
    console.log("Producto no encontrado"); //si no lo encuentra
  }

  return error; //retorna si no encuentra nada
}

module.exports = {
  mostrarProductos,
  buscarPorIDPro,
  buscarPorNombrePro,
  nuevoProducto,
  modificarProducto,
  borrarProducto,
};

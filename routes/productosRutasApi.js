var rutaProduct = require("express").Router(); //variable de ruta
var {
  mostrarProductos,
  nuevoProducto,
  modificarProducto,
  buscarPorIDPro,
  borrarProducto,
} = require("../database/productosBD");

// PRODUCTOS
rutaProduct.get("/productos/api/mostrarProductos", async (req, res) => {  //index mas esto  = /productos/productos
  var productos = await mostrarProductos();
  if (productos.length > 0) {
    res.status(200).json(productos);
  }
  else {
    res.status(400).json("No hay productos 🥺");
  }
});
// Buscar por id
rutaProduct.get("/productos/api/buscarPorIdProducto/:id", async (req, res) => {
  var producto = await buscarPorIDPro(req.params.id);
  if (producto == "") {
    res.status(400).json("No hay productos con ese ID 🥺");
  } else {
    res.status(200).json(producto);
  }
});
// NUEVO PRO
rutaProduct.post("/productos/api/nuevoproducto", async (req, res) => {
  var error = await nuevoProducto(req.body);
  if (error == 0) {
    res.status(200).json("Producto insertado 🥳");
  } else {
    res.status(400).json("Error al insertar producto 🥺");
  }
});

// EDITAR
rutaProduct.post("/productos/api/editarProducto", async (req, res) => {
    var error = await modificarProducto(req.body);
    if (error == 0) {
      res.status(200).json("Producto modificado 🥳");
    } else {
      res.status(400).json("Error al modificar producto 🥺");
    }
});
// ELIMINAR
rutaProduct.get("/productos/api/borrarProducto/:id", async (req, res) => {
    var error = await borrarProducto(req.params.id);
    if (error == 0) {
      res.status(200).json("Producto eliminado 🥳");
    } else {
      res.status(400).json("Error al eliminar producto 🥺");
    }
});

module.exports = rutaProduct;
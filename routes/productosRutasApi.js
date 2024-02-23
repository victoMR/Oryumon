var rutaProduct = require("express").Router(); //variable de ruta
var {
  mostrarProductos,
  nuevoProducto,
  modificarProducto,
  buscarPorIDPro,
  borrarProducto,
} = require("../database/productosBD");
var subirImagen = require("../middlewares/subirArchivoProduct");
var fs = require("fs");
// PRODUCTOS
rutaProduct.get("/productos/api/mostrarProductos", async (req, res) => {
  //index mas esto  = /productos/productos
  var productos = await mostrarProductos();
  if (productos.length > 0) {
    res.status(200).json(productos);
  } else {
    res.status(400).json("No hay productos 🥺");
  }
});
// Buscar por id
rutaProduct.get("/productos/api/buscarPorIdProducto/:id", async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json("ID de producto no proporcionado 🥺");
    }

    const producto = await buscarPorIDPro(id);

    if (!producto) {
      return res
        .status(404)
        .json("No se encontró ningún producto con ese ID 🥺");
    }

    res.status(200).json(producto);
  } catch (err) {
    console.error("Error al buscar producto en el server : " + err);
    res.status(500).json("Error interno del servidor al buscar producto 🥺");
  }
});

// NUEVO PRO
rutaProduct.post(
  "/productos/api/nuevoproducto",
  subirImagen(),
  async (req, res) => {
    req.body.foto = req.file.originalname;
    var error = await nuevoProducto(req.body);
    if (error == 0) {
      res.status(200).json("Producto insertado 🥳");
    } else {
      res.status(400).json("Error al insertar producto 🥺");
    }
  }
);

// EDITAR
rutaProduct.post(
  "/productos/api/editarProducto",
  subirImagen(),
  async (req, res) => {
    var producto = await buscarPorIDPro(req.body.id); // Obtener el usuario
    if (req.file) {
      req.body.foto = req.file.originalname;
    } else {
      req.body.foto = producto.foto; // Mantener la foto existente
    }
    var error = await modificarProducto(req.body);

    if (error == 0) {
      res.status(200).json("Producto modificado 🥳");
    } else {
      res.status(400).json("Error al modificar producto 🥺");
    }
  }

);
// ELIMINAR
rutaProduct.get("/productos/api/borrarProducto/:id", async (req, res) => {
  const producto = await buscarPorIDPro(req.params.id);
  if (producto) {
    if (req.file) {
      req.body.foto = req.file.originalname;
    } else {
      req.body.foto = producto.foto; // Mantener la foto existente
    }
    fs.unlink(`./public/uploadsProducts/${producto.foto}`, (err) => {
      if (err) {
        console.error("Error al eliminar el archivo: " + err);
      } else {
        console.log("Archivo eliminado exitosamente");
      }
    });
  }
  var error = await borrarProducto(req.params.id);
  if (error == 0) {
    res.status(200).json("Producto eliminado 🥳");
  } else {
    res.status(400).json("No existe el producto con ese id 🥺");
  }
});

module.exports = rutaProduct;

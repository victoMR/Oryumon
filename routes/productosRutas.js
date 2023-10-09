var rutaProduct = require("express").Router(); //variable de ruta
var {
  mostrarProductos,
  nuevoProducto,
  modificarProducto,
  buscarPorIDPro,
  borrarProducto,
} = require("../database/productosBD");

//middleware para subir archivos
var subirArchivo = require("../middlewares/subirArchivoProduct");
const fs = require("fs").promises;
//middleware para borrar archivos

// PRODUCTOS
rutaProduct.get("/productos", async (req, res) => {
  //index mas esto  = /productos/productos
  var productos = await mostrarProductos();
  res.render("productos/mostrarPro", { productos });
});
// NUEVO PRO
rutaProduct.get("/productos/nuevoproducto", async (req, res) => {
  res.render("productos/nuevoPro");
});
rutaProduct.post(
  "/productos/nuevoproducto",
  subirArchivo(),
  async (req, res) => {
    req.body.foto = req.file.originalname;
    var error = await nuevoProducto(req.body);
    res.redirect("/productos/productos");
  }
);
// EDITAR
rutaProduct.get("/productos/editar/:id", async (req, res) => {
  var producto = await buscarPorIDPro(req.params.id);
  res.render("productos/modificarPro", { producto });
});
rutaProduct.post("/productos/editar", subirArchivo(), async (req, res) => {
  var producto = await buscarPorIDPro(req.body.id); // Obtener el usuario antes del if
  if (req.file) {
    req.body.foto = req.file.originalname;
  } else {
    req.body.foto = producto.foto; // Mantener la foto existente
  }
  console.log("*********************");
  console.log(req.body.foto);
  var error = await modificarProducto(req.body);
  res.redirect("/productos/productos");
});
// ELIMINAR
rutaProduct.get("/productos/borrar/:id", async (req, res) => {
  var producto = await buscarPorIDPro(req.params.id); // pordia ser await borrarUsuario(req.params.id);
  res.render("productos/eliminarPro", { producto }); // res.redirect("/");
});

rutaProduct.post("/productos/borrar", async (req, res) => {
  const productId = req.body.id; // Accede al id desde req.body
  console.log(productId);

  try {
    const product = await buscarPorIDPro(productId);

    if (req.file) {
      req.body.foto = req.file.originalname;
    } else {
      req.body.foto = product.foto; // Mantener la foto existente
    }

    if (!product) {
      return res.status(404).send("No se encontró el producto");
    }

    await fs.unlink(`./public/uploadsProducts/${product.foto}`);
    await borrarProducto(productId);
    error = 0;

    res.redirect("/productos/productos");
  } catch (error) {
    console.error("Error al borrar el producto o usuario:", error);
    res.status(500).send("Error al borrar el producto o usuario");
  }
});

module.exports = rutaProduct;

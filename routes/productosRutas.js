var rutaProduct = require("express").Router(); //variable de ruta
var {
  mostrarProductos,
  nuevoProducto,
  modificarProducto,
  buscarPorIDPro,
  borrarProducto,
} = require("../database/productosBD");

// PRODUCTOS
rutaProduct.get("/productos", async (req, res) => {  //index mas esto  = /productos/productos
  var productos = await mostrarProductos();
  res.render("productos/mostrarPro", { productos });
});
// NUEVO PRO
rutaProduct.get("/productos/nuevoproducto", async (req, res) => {
  res.render("productos/nuevoPro");
});
rutaProduct.post("/productos/nuevoproducto", async (req, res) => {
  var error = await nuevoProducto(req.body);
  res.redirect("/productos/productos");
});
// EDITAR
rutaProduct.get("/productos/editar/:id", async (req, res) => {
    var producto = await buscarPorIDPro(req.params.id);
    res.render("productos/modificarPro", { producto });
})
rutaProduct.post("/productos/editar", async (req, res) => {
    var error = await modificarProducto(req.body);
    res.redirect("/productos/productos");
})
// ELIMINAR
rutaProduct.get("/productos/borrar/:id", async (req, res) => {
    var producto = await buscarPorIDPro(req.params.id); // pordia ser await borrarUsuario(req.params.id);
    res.render("productos/eliminarPro", { producto });  // res.redirect("/");
})
rutaProduct.post("/productos/borrar", async (req, res) => {
    await borrarProducto(req.body.id);
    res.redirect("/productos/productos");
})

module.exports = rutaProduct;
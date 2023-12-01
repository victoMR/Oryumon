var rutaVenta = require("express").Router();
var { buscarPorID, buscarPorUsuario } = require("../database/usuariosBD");
var {
  mostrarProductos,
  buscarPorIDPro,
  buscarPorNombrePro,
} = require("../database/productosBD");

const {
  encriptarPassword,
  autorizado,
  admin,
} = require("../middlewares/funcionesPassword");


rutaVenta.get("/venta", autorizado, async (req, res) => {
  try {
    const usuario = await buscarPorUsuario(req.session.usuario);
    const usuarios = Array.isArray(usuario) ? usuario : [usuario];

    const productos = await mostrarProductos();

    res.render("venta/venta", { usuarios, productos });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});


rutaVenta.post("/venta", async (req, res) => {
  try {
    const usuario = await buscarPorUsuario(req.session.usuario);
    const usuarios = Array.isArray(usuario) ? usuario : [usuario];

    const producto = await buscarPorIDPro(req.body.selectedProductId);

    // Fetch products from the database (you might want to update this based on your use case)
    const productos = await mostrarProductos();

    res.render("venta/venta", { usuarios, producto, productos });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

rutaVenta.get("/buscar-productos", async (req, res) => {
  try {
    const searchTerm = req.query.search;
    const productos = await buscarPorNombrePro(searchTerm);
    res.json(productos);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

rutaVenta.get("/buscar-producto/:id", async (req, res) => {
  try {
    const producto = await buscarPorIDPro(req.params.id);
    res.json(producto);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

rutaVenta.get("/salir", async (req, res) => {
  req.session = null;
  res.redirect("/");
}
);


module.exports = rutaVenta;

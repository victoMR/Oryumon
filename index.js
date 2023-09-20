var express = require("express");
var dotenv = require("dotenv");
var routes = require("./routes/usuariosRutas"); // para usar las rutas de usuarios
var productosRutas = require("./routes/productosRutas"); // para usar las rutas de productos
dotenv.config(); // para usar el archivo .env

var app = express(); // para crear el servidor

app.set("view engine", "ejs"); // para usar ejs como motor de plantillas

app.use(express.static("public"));

app.use(express.json()); // para recibir datos en formato json
app.use(express.urlencoded({ extended: true })); // para recibir datos de formularios
app.use("/", routes); // para usar las rutas de usuarios
app.use("/productos", productosRutas); // para usar las rutas de productos

var port = process.env.PORT || 8181;

app.listen(port, () => {
  console.log(`Server in = http://localhost:${port}`); // para ver en que puerto esta corriendo el servidor
});

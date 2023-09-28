var express = require("express");
var dotenv = require("dotenv");
var cors = require("cors");
var routes = require("./routes/usuariosRutas"); // para usar las rutas de usuarios
var productosRutas = require("./routes/productosRutas"); // para usar las rutas de productos
var rutasUsuariosApis = require("./routes/usuariosRutasApis"); // para usar las rutas de usuarios
dotenv.config(); // para usar el archivo .env

var app = express(); // para crear el servidor

app.set("view engine", "ejs"); // para usar ejs como motor de plantillas
app.use(cors()); // para usar cors
app.use(express.static("public")); // para usar archivos estaticos
app.use(express.urlencoded({ extended: true })); // para recibir datos de formularios
app.use("/", routes); // para usar las rutas de usuarios
app.use("/productos", productosRutas); // para usar las rutas de productos
app.use("/", rutasUsuariosApis); // para usar las rutas de usuarios puede ser nombrrado con / por que ya esta en el index de rutas


var port = process.env.PORT || 8181;

app.listen(port, () => {
  console.log(`Server in = http://localhost:${port}`); // para ver en que puerto esta corriendo el servidor
});

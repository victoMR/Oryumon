var express = require("express");
var cors = require("cors");
var routes = require("./routes/usuariosRutas"); // para usar las rutas de usuarios
var productosRutas = require("./routes/productosRutas"); // para usar las rutas de productos
var rutasUsuariosApis = require("./routes/usuariosRutasApis"); // para usar las rutas de usuarios
var rutaProductApis = require("./routes/productosRutasApi"); // para usar las rutas de  productos
var rutaLogin = require("./routes/loginRutas"); // para usar las rutas de login
var path = require("path");
// var session = require("express-session"); // para usar sesiones en el servidor 
var session = require("cookie-session"); // para usar sesiones en el servidor con cookies localmente
require("dotenv").config(); // para usar el archivo .env
var app = express(); // para crear el servidor


app.set("view engine", "ejs"); // para usar ejs como motor de plantillas
app.use(cors()); // para usar cors
app.use(session({
  name: "session",
  keys: ["fsdfs"],
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));
app.use("/", express.static(path.join(__dirname,"/public"))) // para usar archivos estaticos como css, js, imagenes etc en la carpeta public
app.use(express.urlencoded({ extended: true })); // para recibir datos de formularios
app.use("/usuarios", routes); // para usar las rutas de usuarios
app.use("/productos", productosRutas); // para usar las rutas de productos
app.use("/usuarios", rutasUsuariosApis); // para usar las rutas de usuarios puede ser nombrrado con / por que ya esta en el index de rutas
app.use("/productos", rutaProductApis); // para usar las rutas de productos
app.use("/", rutaLogin); // para usar las rutas de login


var port = process.env.PORT || 8181;

app.listen(port, () => {
  console.log(`Server in = http://localhost:${port}`); // para ver en que puerto esta corriendo el servidor
});

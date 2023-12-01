var admin = require("firebase-admin");  // para usar firebase

var keys = require("../keys1.json");  // para usar las credenciales de firebase

admin.initializeApp({
    credential: admin.credential.cert(keys),  // para usar las credenciales de firebase
    appName: 'Oryumon'
});

var db = admin.firestore();  // para usar firestore

var conexion = db.collection("usuariosBD");  // para usar la coleccion de la base de datos
// var conexionProductos = db.collection("productosDB");  // para usar la coleccion de la base de datos

module.exports = conexion;  // para exportar la conexion

/**
 moduel.exports = {
    conexion,
    conexionProductos
 }; para exportar la conexion
*/
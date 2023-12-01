var admin = require("firebase-admin");  // para usar firebase

var keys2 = require("../keys1.json");  // para usar las credenciales de firebase


if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(keys2),
        appName: 'Oryumon'
    });
 }else {
    admin.app(); // if already initialized, use that one
 }



var db = admin.firestore();  // para usar firestore

var conexionProBD = db.collection("productosBD");  // para usar la coleccion de la base de datos

module.exports = conexionProBD;  // para exportar la conexion
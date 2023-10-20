class Usuario {
    constructor(id, data) { // Constructor de la clase con password para modificar usuario sin cambiar la contraseña
        this.bandera = 0; // Propiedades de la clase
        this._id = id;  // Propiedades de la clase
        this._nombre = data.nombre;  // Propiedades de la clase
        this._usuario = data.usuario;  // Propiedades de la clase
        this._password = data.password;  // Propiedades de la clase
        this._salt = data.salt;  // Propiedades de la clase
        this._edad = data.edad;  // Propiedades de la 
        this._foto = data.foto;  // Propiedades de la clase
        this._admin = data.admin  // Propiedades de la clase
    }
    // Metodos de la clase
    set id(value) {
        if (value != null) {
            value.length > 0 ? this._id = value : this.bandera = 1;
        }
    }
    set nombre(value) {
        value.length > 0 ? this._nombre = value : this.bandera = 1;
    }
    
    set usuario(value) {
        value.length > 0 ? this._usuario = value : this.bandera = 1;
    }

    
    set password(value) {
        value.length > 0 ? this._password = value : this.bandera = 1;
    }
    
    set salt(value) {
        value.length > 0 ? this._salt = value : this.bandera = 1;
    }
    
    set edad(value) {
        value > 0 ? this._edad = edad : this.bandera = 1;
    }
    
    set foto(value) {
        value.length > 0 ? this._foto = foto : this.bandera = 1;
    }
    set admin(value) {
        this._admin = admin;
    }
    get id() {
    return this._id; // Se retorna el valor de la propiedad _id
    }
    get nombre() {
    return this._nombre;  // Se retorna el valor de la propiedad _nombre
    }
    get usuario() {
    return this._usuario;  // Se retorna el valor de la propiedad _usuario
    }
    get password() {
    return this._password;  // Se retorna el valor de la propiedad _password
    }
    get salt() {
    return this._salt;  // Se retorna el valor de la propiedad _salt
    }
    get edad() {
    return this._edad;  // Se retorna el valor de la propiedad _edad
    }
    get foto() {
    return this._foto;  // Se retorna el valor de la propiedad _foto
    }
    get admin() {
    return this._admin;  // Se retorna el valor de la propiedad _rol
    }
    get obtenerData(){
        if(this._id !=null)
        return {
            id: this.id,  // Se retorna el valor de la propiedad id de el get id
            nombre: this.nombre,  // Se retorna el valor de la propiedad nombre de el get nombre
            usuario: this.usuario, // Se retorna el valor de la propiedad usuario de el get usuario
            password: this.password,  // Se retorna el valor de la propiedad password de el get password
            salt: this.salt,  // Se retorna el valor de la propiedad salt de el get salt
            edad: this.edad, // Se retorna el valor de la propiedad edad de el get edad
            foto: this.foto,  // Se retorna el valor de la propiedad foto de el get foto
            admin: this.admin
        }
        else{
            return {
                nombre: this.nombre,  // Se retorna el valor de la propiedad nombre de el get nombre
                usuario: this.usuario, // Se retorna el valor de la propiedad usuario de el get usuario
                password: this.password,  // Se retorna el valor de la propiedad password de el get password
                salt: this.salt,  // Se retorna el valor de la propiedad salt de el get salt
                edad: this.edad,  // Se retorna el valor de la propiedad edad de el get edad
                foto: this.foto,
                admin: this.admin
            }
        }
        
    }
    
}

module.exports = Usuario; // Se exporta la clase Usuario
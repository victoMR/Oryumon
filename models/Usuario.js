class Usuarios {
  constructor(id, data) {
    this.bandera = 0;
    this._id = id; // Propiedades de la clase
    this._nombre = data.nombre; // Propiedades de la clase
    this._usuario = data.usuario; // Propiedades de la clase
    this._password = data.password; // Propiedades de la clase
    this._salt = data.salt; // Propiedades de la clase
    this._email = data.email; // Propiedades de la clase
    this._telefono = data.telefono; // Propiedades de la clase
    this._foto = data.foto; // Propiedades de la clase
    this._admin = data.admin; // Propiedades de la clase
    this._curp = data.curp; // Propiedades de la clase
    this._direccionEmpresa = data.direccionEmpresa; // Propiedades de la clase
    this._nombreEmpresa = data.nombreEmpresa; // Propiedades de la clase
    this._rfc = data.rfc; // Propiedades de la clase
  }
  get id() {
    return this._id;
  }
  get nombre() {
    return this._nombre;
  }
  get usuario() {
    return this._usuario;
  }
  get password() {
    return this._password;
  }
  get salt() {
    return this._salt;
  }
  get email() {
    return this._email;
  }
  get telefono() {
    return this._telefono;
  }
  get foto() {
    return this._foto;
  }
  get admin() {
    return this._admin;
  }
  get curp() {
    return this._curp;
  }
  get direccionEmpresa() {
    return this._direccionEmpresa;
  }
  get nombreEmpresa() {
    return this._nombreEmpresa;
  }
  get rfc() {
    return this._rfc;
  }
  set id(id) {
    if (id != null && id == "") {
      this.bandera = 1;
    } else {
      this._id = id;
    }
  }
  set nombre(nombre) {
    nombre.trim().length > 0 ? (this._nombre = nombre) : (this.bandera = 1);
  }
  set usuario(usuario) {
    usuario.length > 0 ? (this._usuario = usuario) : (this.bandera = 1);
  }
  set password(password) {
    password.length > 0 ? (this._password = password) : (this.bandera = 1);
  }
  set salt(salt) {
    salt.length > 0 ? (this._salt = salt) : (this.bandera = 1);
  }
  set email(email) {
    email.length > 0 ? (this._email = email) : (this.bandera = 1);
  }
  set telefono(telefono) {
    telefono.length > 0 ? (this._telefono = telefono) : (this.bandera = 1);
  }
  set foto(foto) {
    foto.length > 0 ? (this._foto = foto) : (this.bandera = 1);
  }
  set admin(admin) {
    admin.length > 0 ? (this._admin = admin) : (this.bandera = 1);
  }
  set curp(curp) {
    curp.length > 0 ? (this._curp = curp) : (this.bandera = 1);
  }
  set direccionEmpresa(direccionEmpresa) {
    direccionEmpresa.length > 0
      ? (this._direccionEmpresa = direccionEmpresa)
      : (this.bandera = 1);
  }
  set nombreEmpresa(nombreEmpresa) {
    nombreEmpresa.length > 0
      ? (this._nombreEmpresa = nombreEmpresa)
      : (this.bandera = 1);
  }
  set rfc(rfc) {
    rfc.length > 0 ? (this._rfc = rfc) : (this.bandera = 1);
  }
  get ObtenerDatos() {
    if (this._id != null) {
      return {
        id: this._id,
        nombre: this._nombre,
        usuario: this._usuario,
        password: this._password,
        salt: this._salt,
        email: this._email,
        telefono: this._telefono,
        foto: this._foto,
        admin: this._admin,
        curp: this._curp,
        direccionEmpresa: this._direccionEmpresa,
        nombreEmpresa: this._nombreEmpresa,
        rfc: this._rfc,
      };
    } else {
      return {
        nombre: this.nombre,
        usuario: this.usuario,
        password: this.password,
        salt: this.salt,
        email: this.email,
        telefono: this.telefono,
        foto: this.foto,
        admin: this.admin,
        curp: this.curp,
        direccionEmpresa: this.direccionEmpresa,
        nombreEmpresa: this.nombreEmpresa,
        rfc: this.rfc,
      };
    }
  }
}

module.exports = Usuarios;

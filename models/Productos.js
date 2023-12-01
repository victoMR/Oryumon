class Productos {
  constructor(id, data) {
    this.bandera = 0;
    this._id = id;
    this._nombre = data.nombre;
    this._descripcion = data.descripcion;
    this._precio = data.precio;
    this._cantidad = data.cantidad;
    this._foto = data.foto;
    this._categoria = data.categoria;
    this._iva = data.iva;
    this._descuento = data.descuento;
    this._reserva = data.reserva;
  }
  get id() {
    return this._id;
  }
  get nombre() {
    return this._nombre;
  }
  get descripcion() {
    return this._descripcion;
  }
  get precio() {
    return this._precio;
  }
  get cantidad() {
    return this._cantidad;
  }
  get foto() {
    return this._foto;
  }
  get categoria() {
    return this._categoria;
  }
  get iva() {
    return this._iva;
  }
  get descuento() {
    return this._descuento;
  }
  get reserva() {
    return this._reserva;
  }
  set id(id) {
    if (id != null && id == "") {
      this.bandera = 1;
    } else {
      this._id = id;
    }
  }
  set nombre(nombre) {
    if (nombre != null && nombre == "") {
      this.bandera = 1;
    } else {
      this._nombre = nombre;
    }
  }
  set descripcion(descripcion) {
    if (descripcion != null && descripcion == "") {
      this.bandera = 1;
    } else {
      this._descripcion = descripcion;
    }
  }
  set precio(precio) {
    if (precio != null && precio == "") {
      this.bandera = 1;
    } else {
      this._precio = precio;
    }
  }
  set cantidad(cantidad) {
    if (cantidad != null && cantidad == "") {
      this.bandera = 1;
    } else {
      this._cantidad = cantidad;
    }
  }
  set foto(foto) {
    if (foto != null && foto == "") {
      this.bandera = 1;
    } else {
      this._foto = foto;
    }
  }
  set categoria(categoria) {
    if (categoria != null && categoria == "") {
      this.bandera = 1;
    } else {
      this._categoria = categoria;
    }
  }
  set iva(iva) {
    if (iva != null && iva == "") {
      this.bandera = 1;
    } else {
      this._iva = iva;
    }
  }
  set descuento(descuento) {
    if (descuento != null && descuento == "") {
      this.bandera = 1;
    } else {
      this._descuento = descuento;
    }
  }
  set reserva(reserva) {
    if (reserva != null && reserva == "") {
      this.bandera = 1;
    } else {
      this._reserva = reserva;
    }
  }
  get ObtenerDatos() {
    if (this._id != null) {
      return {
        id: this._id,
        nombre: this._nombre,
        descripcion: this._descripcion,
        precio: this._precio,
        cantidad: this._cantidad,
        foto: this._foto,
        categoria: this._categoria,
        iva: this._iva,
        descuento: this._descuento,
        reserva: this._reserva,
      };
    } else {
      return {
        nombre: this.nombre,
        descripcion: this.descripcion,
        precio: this.precio,
        cantidad: this.cantidad,
        foto: this.foto,
        categoria: this.categoria,
        iva: this.iva,
        descuento: this.descuento,
        reserva: this.reserva,
      };
    }
  }
}

module.exports = Productos;

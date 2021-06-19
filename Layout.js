const LayoutToken = require('./LayoutToken');
const  fs = require('fs');
class Layout {

  layoutToken = null;

  constructor(cad) {
    this.programacion = cad;
    this.layoutToken = new LayoutToken(cad);
  }




  generarLayout(datos) {

    let tablas = this.layoutToken.tablas;
    let cadenaLayout = "";
    let cont = 0;

    for (let i in tablas) {
      let tabla = tablas[i];
      let configuracion = this.layoutToken.tokenColumna[cont];
      let t = datos[tabla];
      if (t) {
        cadenaLayout += this.generarSeccion(t, configuracion);
      }
      cont++;
    }

    fs.appendFile('log.txt',cadenaLayout, function (err) {
      if (err) {
        // append failed
      }
       else {
        console.log("Se termino de generar el layout")
      }
    })


  }


  generarSeccion(tabla, configuracion) {
    let layoutGenerado = '';

    for (let f = 0; f < tabla.length; f++) {
      let fila = tabla[f];

      for (let conf = 0; conf < configuracion.length; conf++) {
        let item = configuracion[conf];
        layoutGenerado += this.generarColumna(fila, item);

      }
      layoutGenerado += "\n";

    }

    return layoutGenerado;

  }

  generarColumna(fila, tokens) {
    let max = tokens.tamano;
    let direccion = tokens.direccion;
    let car = tokens.espacio;
    let cad = this.crearCadena(fila, tokens.cadena);
    let l = cad.length;


    if (max == 0) {
      return cad;
    }
    else if (l > max) {
      return cad.substring(0, max);
    }
    else {
      if (direccion == 'i') {
        for (let i = 0; i < (max - l); i++) {
          cad += car;
        }
      }
      else {
        let cadIzq = '';
        for (let i = 0; i < (max - l); i++) {
          cadIzq += car;
        }
        cad = cadIzq + cad;
      }

      return cad;
    }
  }

  crearCadena(fila, tokensCadena) {
    let cad = "";

    for (let i = 0; i < tokensCadena.length; i++) {

      let item = tokensCadena[i];

      if (item.nombre === "ciclo") {

        let car= this.obtenerDato(fila, item.cadena);

        for(let j = 0; j< item.valor; j++){
           cad += car;
        }

      }
      else {
        cad += this.obtenerDato(fila, item);
      }
    }

    return cad;
  }


  obtenerDato(fila, item) {
    let cad = '';
    if (item.nombre === "columna") {
      let dato = fila[item.valor];
      if (dato) {
        cad = dato;
      }
      else {
        cad = '###404'
      }

    }
    else if (item.nombre === "literal") {
      cad = item.valor;

    }
    return cad;
  }


}

module.exports = Layout;
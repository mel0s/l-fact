const LayoutToken = require('./LayoutToken');
class Layout {
  /**
   * Inicializa el analisis del codigo fuente.
   * @param {String} cad - Codigo fuente de configuracion 
   */
  constructor(cad) {
    try {

      if(cad){
        // Sin espacios
        cad = cad.trim();
        this.programacion = cad;
        this.layoutToken = new LayoutToken(cad);
      }
      else{
        throw new SyntaxError("El codigo fuente no fue creado o asignado al constructor Layout");
      }

      
    } 
    catch (error) {
      throw new SyntaxError( error.message);
      
    }
  }

  /**
   * 
   * @param {Array} fila - Datos base del registro del layout
   * @param {Array} tokensCadena - Lista de tokens de la seccion
   * @returns 
   */
  crearCadena(fila, tokensCadena) {
    let cad = "";

    for (let i = 0; i < tokensCadena.length; i++) {

      let item = tokensCadena[i];

      if (item.nombre === "ciclo") {

        let car = this.obtenerDato(fila, item.cadena);

        for (let j = 0; j < item.valor; j++) {
          cad += car;
        }

      }
      else {
        cad += this.obtenerDato(fila, item);
      }
    }

    return cad;
  }

  /**
   * Genera el texto del layout
   * @param {Object} datos - Coleccion de tablas o colecciones que se son la base del layout a mostrar.
   * @returns {String} - Cadena del layout generado
   */
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
      else{
        cadenaLayout += "###404Tabla\n";
      }
      cont++;
    }
    // Layout generado
    return cadenaLayout;

  }

  /**
   * Obtiene la cadena de la seccion.
   * @param {Object} tabla - Datos del layout
   * @param {Object} configuracion - Configuracion del la seccion actual
   * @returns  {String} - Cadena que representa la seccion
   */
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

  /**
   * Obtiene el texto de la columna 
   * @param {Object} fila - Datos base de la fila.
   * @param {Object} tokens  - Configuracion de la fila. 
   * @returns {String} - Cadena que representa la fila
   */
  generarColumna(fila, tokens) {
    let max = tokens.tamano;
    let direccion = tokens.direccion;
    let car = tokens.espacio;
    let cad = this.crearCadena(fila, tokens.cadena);
    let l = cad.length;

    // La columna no tiene tama;o
    if (max == 0) {
      return cad;
    }
    // La columna es mas grande que el limite
    else if (l > max) {
      return cad.substring(0, max);
    }
    // La oclumna es mas peque;a que el tamaño establecido, entonces se establece orientacion,  y llenado de caracteres
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


  /**
   * Obtiene el dato real de un token.
   * @param {Object} fila - Datos base.
   * @param {Object} item  - Configuracion del token.
   * @returns {String} - Datos real de un token
   */
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
(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const Layout = require('./src/Layout.js');

exports.Layout = Layout;

window._ = Layout



 




},{"./src/Layout.js":3}],2:[function(require,module,exports){
/**
 * Contiene los metodos para obtener la informacion de una columna.
 */
class Columna {

  /**
   * Constructor con el string de configuracion
   * @param {Strign} - Codigo de confiduracion
   */
  constructor(cad) {
    this.programacion = cad;
  }

  /**
   * Determina si el token es de tipo ciclo.
   * @param {String} token 
   * @returns  Datos de configuracion del token ciclos.
   */
  ciclosCadena(token) {

    if (/^\^c[^\^]/.test(token)) {
      let repeticiones = token.match(/^\^c[\d]+/)[0];
      let l = repeticiones.length;
      if (repeticiones) {
        repeticiones = repeticiones.substring(2);
        repeticiones = parseInt(repeticiones);
      }
      else {
        repeticiones = 0;
      }
      let cadena = this.texto(token.substring(l));
      return {
        nombre: "ciclo",
        valor: parseFloat(repeticiones),
        cadena

      };
    }
    else {
      return;
    }
  }

  /**
   * Obtiene la configuracion de un token cadena.
   * @param {Array} tokens - Tokens de la columna 
   * @returns {Object} - Configuracion recolectada de una token cadena
   */
  estructuraCadena(tokens) {
    let t = tokens.find(e => /^\^\$|\$+/.test(e));
    let arbolToken = { cadena: [] };

    if (t) {
      let lemas = t.substring(t.indexOf("$") + 1 ).split('+^');

      for (let i = 0; i < lemas.length; i++) {
        let lema = lemas[i];

        let ciclos = this.ciclosCadena(lema);
        if (ciclos) {
          arbolToken.cadena.push(ciclos);
          continue;
        }

        let nombreColumna = this.nombreColumna(lema);
        if (nombreColumna) {
          arbolToken.cadena.push(nombreColumna)
          continue;
        }


        let cadenaLiteral = this.cadenaLiteral(lema);
        if (cadenaLiteral) {
          arbolToken.cadena.push(cadenaLiteral);
          continue;
        }

      }
    }

    return arbolToken;



  }

  /**
   * Determina si el token es una columna de una tabla.
   * @param {String} token - Token a analizar.
   * @returns {Object} - Datos de configuracion del token columna
   */
  nombreColumna(token) {
    let t = token.match(/^#[^#]+|^\^#[^#]+/);
    if (t) {
      t = t[0];
      if (t) {
        let cadena = t.substring( t.indexOf("#") + 1);
        return {
          valor: cadena,
          nombre: "columna"
        };
      }
      else {
        return;
      }
    }
    else {
      return;
    }
  }

  /**
   * Determina si el token es del tipo literal
   * @param {String} token - Token literal
   * @returns Datos de configuracion del token literlal.
   */
  cadenaLiteral(token) {

    let t = token.match(/[<]{1}[^<|^>]+[>]{1}/);

    if (t) {
      t = t[0];
      if (t) {
        let cadena = t.substring(1, t.length - 1);
        return {
          valor: cadena,
          nombre: "literal"
        };
      } 
      else {
        return;
      }
    }
    else {
      return;
    }
  }

  /**
   * Analiza el token y determina de que tipo es. 
   * @param {String} token - Token
   * @returns {Object} - Configuraciondel token analizado
   */
  texto(token) {

    let nombreColumna = this.nombreColumna(token);

    if (nombreColumna) {
      return nombreColumna;
    }

    let cadenaLiteral = this.cadenaLiteral(token);

    if (cadenaLiteral) {
      return cadenaLiteral;

    }
    return '';
  }
}

module.exports = Columna;
},{}],3:[function(require,module,exports){
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
},{"./LayoutToken":4}],4:[function(require,module,exports){
//
const Propiedades = require('./Propiedades');
const Columna = require('./Columna');

/**
 *  Genera el proceso de analisis del codigo layout.
 */
class LayoutToken {


  /**
   * Inicializa el proceso de analisis del codigo de configuracion.
   * @param {String} cad - Codigo de configuracion.
   */
  constructor(cad) {
    // Codigo de configuracion
    this.programacion = cad;
    // Partes del layout.
    this.registros = [];
    // Columnas encontradas en la configuracion del layout.
    this.columnas = [];
    // Partes de la columna.
    this.tokenColumna = [];
    // Nombre de las tablas, configuradas.
    this.tablas = [];
    // Obtiene las propiedades de configuiracion de una columna.
    this.propiedadesCol = new Propiedades();

    // Datos de la columna.
    this.columna = new Columna(cad);


    this.obtenerArbolToken();
  }


  /**
   * Obtiene las seccion configuradas en el codigo fuente. 
   * @returns {Object}- Secciones
   */
  buscarSecciones() {
    this.registros = [...this.programacion.match(/[^\n]*\n*/mg)];


    if(this.registros.length == 0 ){
      throw new SyntaxError("No existen secciones configuradas; El salto de linea indica el final de la configuracion de una seccion  ");
      return;
    }    



    this.registros.forEach((e, i) => {
      if (e) {
        e = e.trim();
        this.registros.splice(i, 1, e);
      }
      else{
        this.registros.splice(i, 1);
      }
    });

    

    return this.registros;
  }

  /**
   * Obtiene las columnas configuradas.
   */
  obtenerColumnas() {
    let registros = this.registros;
    for (let i in registros) {
      let registro = registros[i];
      this.columnas.push(registro.split("|"));
    }
  }

  /**
   * Obtiene la configuracion de las  columnas del layout configuradas.
   */
  obtenerColumnasToken() {
    let columnas = this.columnas;
    for (let i = 0; i < columnas.length; i++) {
      let reg = columnas[i];
      let a = reg.slice(1);
      let col = [];

      for (let j = 0; j < a.length; j++) {
        let item = a[j];
        let tokens = item.split(',');
        let arbolToken = {};

        Object.assign(arbolToken, this.propiedadesCol.obtenerPropiedades(tokens), this.columna.estructuraCadena(tokens));

        col.push(arbolToken);
      }

      this.tokenColumna.push(col);
    }
  }

  /**
   * Obtiene el nombre de la tablas configuradas.
   */
  obtenerNombreTabla() {
    let columnas = this.columnas;

    for (let i = 0; i < columnas.length; i++) {
      let columna = columnas[i];

      if (columna[0]) {
        let con = columna[0].match(/[<]{1}[^<\^>]*[>]{1}/gm);
        if (con) {
          con = con[0];
          this.tablas.push(con.substring(1, con.length - 1));
        }
        else {
          this.tablas.push('###404Columna');
        }
      }
      else {
        this.tablas.push('###404Columna');
      }
    }

  }


  /** 
   * Busca la configuracion del codigo fuente.
   */
  obtenerArbolToken() {
    // Busca las secciones del layout
    this.buscarSecciones();
    // Obtiene las columnas de cada uno de los registros.
    this.obtenerColumnas();
    // Obtiene los nombres de las tablas configuradas
    this.obtenerNombreTabla();
    // Obtiene la configuracion de cada una de las columnas
    this.obtenerColumnasToken();
  }


}

module.exports = LayoutToken;
},{"./Columna":2,"./Propiedades":5}],5:[function(require,module,exports){
/**
 * Propiedades de una columna
 */
class Propiedades {
  
  constructor(){
    // Coleccion de propiedades de una columna.
    this.propiedades = {};
  }

  /**
   * 
   * @param {Array} tokens - Lista de tokens de configuracion de una columna.
   * @returns - Configuracion de llenado por si el tamaño de la columna es mas grande que el contenido
   */
  espacio(tokens) {
    let t = tokens.find(e => /^\^e[^\^]/.test(e));
    if (t) {
      return {
        espacio: t.substring(2)
      }
    }
    else {
      return {
        espacio: ' '
      };
    }
  }

  /**
   * Obtiene la orientacion de la columna/
   * @param {Array} tokens - Lista de tokens de configuracion de una columna.
   * @returns {Object} - Configuracion de orientacion.
   */
  direccion(tokens) {

    let t = tokens.find(e => /^\^d[*^]/.test(e));

    if (t == "^di") {
      return {
        direccion: 'i'
      }
    }
    else if (t == "^dd") {
      return {
        direccion: 'd'
      };
    }
    else {
      return {
        direccion: 'i'
      }
    }
  }

  /**
   * Obtiene el tamaño de la columna
   * @param {Array} tokens  - Coleccion de propiedades de la columnas configurada
   * @returns Indica el tama;o de la columna
   */
  tamano(tokens) {
    let t = tokens.find(e => /^\^l[\d]/.test(e));
    if (t) {
      return {
        tamano: parseFloat(t.substring(2))
      }
    }
    else {
      return {
        tamano: 0
      };
    }
  }

  /**
   * Ejecuta el analasis de configuracion de las propiedades de una columna
   * @param {Array} tokens - Tokens de la columna
   * @returns {Obejct} - Propiedades de la columna.
   */
  obtenerPropiedades(tokens) {
    return Object.assign(this.propiedades, this.tamano(tokens), this.espacio(tokens), this.direccion(tokens));
  }
}

module.exports = Propiedades;
},{}]},{},[1]);

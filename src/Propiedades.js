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
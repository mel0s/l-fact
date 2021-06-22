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
    let t = tokens.find(e => /^\^\$+/.test(e));
    let arbolToken = { cadena: [] };

    if (t) {
      let lemas = t.substring(2).split('+^');

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
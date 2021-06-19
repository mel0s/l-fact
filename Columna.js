class Columna {


  constructor(cad) {
    this.programacion = cad;
  }

  estructuraCadena(tokens) {
    let t = tokens.find(e => /^\$[^\$]*/.test(e));
    let arbolToken = { cadena: [] };

    if (t) {
      let lemas = t.substring(1).split('^+');

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

  nombreColumna(token) {

    if (/^#[^#]+|^\^#[^#]+/.test(token)) {
      let comodin = token.indexOf("#");
      let cadena = token.substring(comodin + 1);
      return {
        valor: cadena,
        nombre: "columna"

      };
    }
    else {
      return;
    }

  }

  cadenaLiteral(token) {

    if (/^[<]{1}[^<>]*[>]{1}/.test(token)) {
      let cadena = token.substring(1, token.length - 1);
      return {
        valor: cadena,
        nombre: "literal"
      };
    }
    else {
      return;
    }

  }

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
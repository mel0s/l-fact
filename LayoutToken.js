const Propiedades = require('./Propiedades');
const Columna = require('./Columna');
class LayoutToken {
  programacion = ""
  registros = [];
  columnas = [];
  tokenColumna = [];
  tablas = [];

  propiedadesCol = new Propiedades();
  columna = new Columna(); 

  constructor(cad) {
    this.programacion = cad;
    this.obtenerArbolToken();
  }


  buscarSecciones() {
    this.registros = [...this.programacion.match(/[%s]{1}[^%]*[\%]{1}/mg)];


    this.registros.forEach((e, i) => {
      this.registros.splice(i,1, e.substring(1, e.length - 1));
    });

    return this.registros;
  }

  obtenerColumnas() {
    let registros = this.registros;
    for (let i in registros) {
      let registro = registros[i];
      this.columnas.push(registro.split("|"));
    }
  }

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

  obtenerNombreTabla() {
    let columnas = this.columnas;

    for (let i = 0; i < columnas.length; i++) {
      let columna = columnas[i];

      if (columna[0]) {
        let con = columna[0].match(/[<]{1}[^<>]*[>]{1}/gm);
        con = con[0];

        if (con) {
          this.tablas.push(con.substring(1, con.length - 1));
        }
        else {
          this.tablas.push('###404');
        }
      }
      else {
        this.tablas.push('###404');
      }
    }

  }

  texto(cad, fila) {
    if (/^\^t[*^]/.test(cad)) {
      let token = cad.substring(cad.indexOf("^t"));
      let d = this.columna(token, fila);

      if (d) {
        return d;
      }
      else {
        return cad;
      }
    }
    return undefined;

  }

  columna() {
    if (/^#/.test(cad)) {
      let nombreColumna = cad.substring(cad.indexOf("#"));
      let dato = fila[nombreColumna];
      if (dato) {
        return dato;
      }
      else {
        return;
      }
    }
    return;
  }


  obtenerArbolToken() {
    this.buscarSecciones();
    this.obtenerColumnas();
    this.obtenerNombreTabla();
    this.obtenerColumnasToken();
  }


}

module.exports = LayoutToken;
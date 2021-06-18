class Analizador {
  programacion = ""
  registros = [];
  columnas = [];
  tokenColumna = [];
  tablas = [];

  constructor(cad) {
    this.programacion = cad;
  }

  tamano(tokens, cad) {
    let t = tokens.find(e => /^\^l[*^]/.test(e));

    if (t) {
      return {
        tamano: parseFloat(cad.substring(cad.indexOf("^l"));
      }
    }
    else {
      return {
        tamano: 0
      };
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
  }


  ciclos(tokens) {

    let t = tokens.find(e => /^\^c[*^]/.test(e));

    if (t) {
      let comodin = cad.indexOf("#") - 1 ;
      let numero = t.substring(cad.indexOf("^c"), comodin);
      let cadena = t.substring(comodin);
      return {
        ciclos: {
          numero :  parseFloat(numero),
          cadena :  cadena
        }
      }
    }
    else {
      ciclos: {
        numero :  0
      }
    }
  }

  columna(cad, fila) {
    if (/^#/.test(cad)) {
      let nombreColumna = cad.substring(cad.indexOf("#"));
      let dato = fila[nombreColumna];
      if (dato) {
        return dato;

      }
      else {
        return undefined;
      }
    }
    return undefined;
  }



  generarLayout(datos) {
    let registros = this.registros;

    for (let i = 0; i < registros.length; i++) {
      let nombreTabla = this.tablas[i];
      let columnas = this.tokenColumna[i];
      let tabla = datos[nombreTabla];

      for (let f = 0; f < tabla.length; f++) {

        for (let c = 0; t < columnas; c++) {
          let columna = columnas[c];
          let tamano = this.tamano(columna);

          for (let t = 0; t < columna.length; t++) {
            tamano = this.tamano(columna);

          }

        }

      }

    }

  }


  buscarSecciones() {
    this.registros = [...this.programacion.match(/[%s]{1}[^%]*[\%]{1}/mg)];


    this.registros.forEach(e => {
      e = e.substring(1, e.length);
    });

    return this.registros;
  }

  generarAnalizador() {
    this.buscarSecciones();
    this.obtenerColumnas();
    this.obtenerNombreTabla();
    this.obtenerColumnasToken();
  }

  generarColumna(cad, max = 0, car = ' ', o = 'i') {

    let l = cad.length;
    if (max == 0) {
      return cad;
    }
    else if (l > max) {
      return cad.substring(0, max);
    }
    else {
      if (o == 'i') {
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
      let a = reg.splice(1);
      let col = [];

      for (let j = 0; j < a.length; j++) {
        let item = a[j];

        let tokens = item.split(',');

        let arbolToken = {};

        let tamano = tokens.filter(e => this.tamano(e));

        tokens.forEach(e => {
          // Tama;o 
          if () {

          }



        });


        col.push();
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
}

module.exports = Analizador;
class Propiedades {  
  propiedades = {};

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
    else{
      return {
        direccion: 'i'
      }
    }
  }  

  
  obtenerPropiedades(tokens){
    tokens = tokens|| this.tokens;
    return Object.assign( this.propiedades,  this.tamano(tokens), this.espacio(tokens), this.direccion(tokens)) ;
    
  }
}

module.exports = Propiedades;
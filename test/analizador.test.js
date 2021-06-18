const analizador = require('../Analizador');
let cad = 
`%s1<tabla1>|^t10,^c2#perro,^di||^l#perro|^fcx1#fecha%
 %s2<tabla2>|^t10,^c2#perro,^di||^l#perro|^fcx1#fecha%
 %s3<tabla3>|^t10,^c2#perro,^di||^l#perro|^fcx1#fecha%`;

let a = new  analizador(cad);

test('Regresando datos', () => {
  a.generarAnalizador(cad)
  console.log( a.tokenColumna);
});
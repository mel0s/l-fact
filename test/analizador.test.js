const layout = require('../src/Layout');
let cad =
  `<tabla1>|^e ,^l50,^di,^$^c2#perro+^#gato|^$^c2<%> |^e ,^l50,^di,^$^c10<@+>+^<\t>|^$^<Hola>+^<\t>|^$^#perro+^<\t>
  <tabla2>|^e ,^l50,^di,^$^c2#perro+^#gato+^<lomito>||$^#perro
  <tabla3>|^e ,^l50,^di,^$^c2#perro+^#gato+^<lomito>||$^#perro`;


let datos = {
  tabla1: [
    {
      perro: "Pastor Belga",
      gato: "Egipcio"
    }
  ],
  tabla2: [
    {
      perro: "Pastor ALEMAN",
      gato: "Persa"
    },
    {
      perro: "Bulldog",
      gato: "Bengala"
    },
    {
      perro: "Chihuahua",
      gato: "Siames"
    }

  ],
  tabla3: [
    {
      perro: "Maltes",
      gato: "Burmes"
    }
  ]
}


let l = new layout(cad);
let t = l.generarLayout(datos);

test('Esperando que no sea una cadena vacia', () => {

  console.log(l.generarLayout(datos))
  expect(l.generarLayout(datos)).not.toBe('');
});
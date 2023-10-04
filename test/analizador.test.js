const layout = require('../src/Layout');
let cad =
  `<tabla1>|^e ,^l10,^di^$^<Cuenta Cargo>|^e ,^l10,^di^$^<cuentaAbono>|^e ,^l10,^di^$^<cuentaAbono>
  <tabla1>|^e ,^l100,^di^$^#columna1|^e ,^l10,^di^$^#columna2|^e ,^l10,^di^$^#columna3|^e ,^l10,^di^$^#columna4
  <tabla2>|^e ,^l50,^di,^$^c2#perro+^#gato+^<lomito>||$^#perro
  <tabla3>|^e ,^l50,^di,^$^c2#perro+^#gato+^<lomito>||$^#perro`;


let datos = {
  tabla1: [
    {
        columna1: "Cuenta Cargo",
        columna2: "cuentaAbono",
        columna3: "Banco Receptor",
        columna4: "Beneficiario",
        columna5: "Importe",
        columna6: "Concepto",
        columna6: "Estado Cuenta",
        columna7: "RFC",
        columna7: "IVA",
        columna7: "Referencia",
        columna7: "Forma Aplicacion",
        
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
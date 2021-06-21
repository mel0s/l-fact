const layout = require('../Layout');
let cad = 
`
%s<tabla1>|^e ,^l50,^di,^$^c2#perro+^#gato+^<\t>| |^e ,^l50,^di,^$^c10<@+>+^<\t>|^$^<Hola>+^<\t>|^$^#perro+^<\t>%
%s<tabla2>|^e ,^l50,^di,^$^c2#perro+^#gato+^<lomito>||$^#perro%
%s<tabla3>|^e ,^l50,^di,^$^c2#perro+^#gato+^<lomito>||$^#perro%
`;


let datos ={
  tabla1:[
    {
      perro:"Pastor Belga",
      gato: "Egipcio"
    }
  ],
  tabla2:[
    {
      perro:"Pastor ALEMAN",
      gato: "Persa"
    },
    {
      perro:"Bulldog",
      gato: "Bengala"
    },
    {
      perro:"Chihuahua",
      gato: "Siames"
    }

  ],
  tabla3:[
    {
      perro:"Maltes",
      gato: "Burmes"
    }
  ]
}


let l = new  layout(cad);
test('Regresando datos', () => {  
  l.generarLayout(datos);
});
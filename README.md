# Lenguaje Layout

## Lenguaje de marcado para generar archivos layout basados en una consulta.

### Ejemplo

```
import { Layout } from "l-fact";

...
...
...

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

let l = new  Layout(cad);
let t = l.generarLayout(datos);
console.log(t);
```

> EL resultado daria un cadena formateada la cual puede ser creada un archivo txt.

```
 Pastor BelgaPastor BelgaEgipcio                   @+@+@+@+@+@+@+@+@+@+                                   Hola       Pastor Belga
 Pastor ALEMANPastor ALEMANPersalomito             Pastor ALEMAN
 BulldogBulldogBengalalomito                       Bulldog
 ChihuahuaChihuahuaSiameslomito                    Chihuahua
 MaltesMaltesBurmeslomito                          Maltes

```
> Los siguientes son errores con seguimiento

. ###404Tabla > La tabla no fue escrita con la sintasis correspondiente o no existe en los datos.
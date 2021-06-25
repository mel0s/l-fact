# Lenguaje Layout

## Lenguaje de marcado para generar archivos layout basados en una consulta.
###  La sintaxis  cuenta con elementos de ciclos, tamaño de la columna, concatenacion de cadena y  caracteres de relleno.
Los datos puedes ser obtenidos de un  json que cuenta con los  datos base para la generacion de la cadena ya formateada.


> Su propósito inicial es para la generacion de layout de bancos (Ejemplo el banco de Banorte)

De la comunidad para la comunidad

~~~
  npm install l-fact
~~~
### Ejemplo

```
import { Layout } from "l-fact";

...
...
...

let cad = 
 `<tabla1>|^e ,^l50,^di,^$^c2#perro+^#gato|^$^c2<%> |^e ,^l50,^di,^$^c10<@+>+^<\t>|^$^<Hola>+^<\t>|^$^#perro+^<\t>
  <tabla2>|^e ,^l50,^di,^$^c2#perro+^#gato+^<lomito>||$^#perro
  <tabla3>|^e ,^l50,^di,^$^c2#perro+^#gato+^<lomito>||$^#perro`;

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

> El resultado daria un cadena formateada la cual puede ser creada en un archivo txt.

```
 Pastor BelgaPastor BelgaEgipcio                   @+@+@+@+@+@+@+@+@+@+                                   Hola       Pastor Belga
 Pastor ALEMANPastor ALEMANPersalomito             Pastor ALEMAN
 BulldogBulldogBengalalomito                       Bulldog
 ChihuahuaChihuahuaSiameslomito                    Chihuahua
 MaltesMaltesBurmeslomito                          Maltes

```

## Los siguientes son errores con seguimiento  
===

* ### ***###404Tabla***  La tabla no fue escrita con la sintasis correspondiente o no existe en los datos.
* ***###404Columna***  La tabla no fue escrita con la sintasis correspondiente o no existe en los datos.

## Sintaxis  


* ***<***_Tabla_***>***  El nombre de la tabla indica de donde se obtienen los datos de los elementos del tipo columna.  
***Nota: Debe estar configurada como la primera columna de configuración***  

* ***|***  Indica la separacion de la configuracion de una columna.   ***Ejemplo: <tabla2>|^e ,^l50,^di,^$^c2#perro+^#gato+^<lomito>|$^#perro***

* ***^l***_Numero_  Tamaño de la columna configurada.  ***Ejemplo: ^l12***
* ***^e***_Caracter|Cadena_  Configura el token o cadena que serviran de relleno para llegar al tamaño configurado el cual es establecido por ***^l*** de la columna.  ***Ejemplo: ^e_***
* ***^d***_Orientacion_  Direccion del texto. Las dos opciones son i = izquierda ó d = derecha.  ***Ejemplo: ^di***

* ***^$***  Indica el inicio del token cadena, son necesarios para determinar el texto de la columna.   ***Ejemplo: ^$^c2#perro+^#gato+^<lomito>***
* ***^<***_literal_***>***  Indica que la cadena se mostrara tal como esta escrita.  
* ***^c***_NumeroTokenCadena_  El numero indica las veces que una cadena es ciclada.  ***Ejemplo: ^c5#perro***  
* ***+***  Concatenacion de varios token cadena.     ***Ejemplo: ^$^c2#perro+^#gato+^<lomito>***  

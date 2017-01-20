# Ayudantes

Uselos para clases de propósito general destinadas a sobre escribir valores  se recomienda ponerlos en un archivo separado y nombrarlos empezando por un guión bajo. Son típicamente cosas que se etiquetan con *!important*. Utilícelos con *mucha* moderación.

```css
._unmargin { margin: 0 !important; }
._center { text-align: center !important; }
._pull-left { float: left !important; }
._pull-right { float: right !important; }
```

## Nombrando los ayudantes
Se nombran iniciando con un guión bajo.  Esto hará que sea fácil diferenciarlos de los modificadores definidos en el componente. Los guiones bajos también se ven un poco feo que es un efecto secundario intencional: el uso de demasiados ayudantes debe desalentarse.

  ```html
  <div class='order-graphs -slim _unmargin'>
  </div>
  ```

## Organizando los ayudantes
Coloque todos los ayudantes en un archivo llamado `helpers`. Puede separarlos en archivos múltiples, pero es preferible mantener el numero de ayudantes al mínimo.

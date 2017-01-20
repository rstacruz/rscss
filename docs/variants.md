# Variantes

Los componentes pueden tener variantes, los elementos también pueden tener variantes.

![](images/component-modifiers.png)

<br>

## Nombrando las variantes
Los nombres de las variantes serán antepuestas por un guión  (`-`).

  ```scss
  .like-button {
    &.-wide { /* ... */ }
    &.-short { /* ... */ }
    &.-disabled { /* ... */ }
  }
  ```

## Variantes de elementos
Los elementos pueden tener variantes.

  ```scss
  .shopping-card {
    > .title { /* ... */ }
    > .title.-small { /* ... */ }
  }
  ```

## Guiones prefijos
Se recomienda anteponer las variantes con guiones.

  * Evitan ambigüedad de los elementos.
  * Una clase solamente puede iniciar con una letra, `_` o un `-`.
  * Los guiones son mas fáciles de escribir que los guiones bajos.
  * Se parecen a los interruptores usados en los comando de UNIX (`gcc -O2 -Wall -emit-last`).

¿Como hacer uso de elementos complejos? Anidandolos
[Continuar →](nested-components.md)
<!-- {p:.pull-box} -->

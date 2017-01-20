# Interfaces

![](images/layouts.png)

## Se deben evitar para posicionamiento.

Los componentes deben de estar hechos de tal forma que sean reusable en diferentes contextos. Se debe evitar estas propiedades en los componentes: 

  * Posicionamiento (`position`, `top`, `left`, `right`, `bottom`)
  * Flotantes (`float`, `clear`)
  * Margenes (`margin`)
  * Dimensiones (`width`, `height`) *

## Dimensiones fijas

Una excepción a esto podrían ser los elementos que tengan alto o ancho fijo, tales como  las imágenes de perfil o para los logotipos.

## Definir el posicionamiento en los padres

Si se necesita definir esto , intenta definirlos en el contexto donde estarán. En el siguiente ejemplo el ancho y el flotamiento es aplicado en el componente padre *article-list* , no en el componente en si.

  ```css
  .article-list {
    & {
      @include clearfix;
    }

    > .article-card {
      width: 33.3%;
      float: left;
    }
  }

  .article-card {
    & { /* ... */ }
    > .image { /* ... */ }
    > .title { /* ... */ }
    > .category { /* ... */ }
  }
  ```

¿Cómo aplicar los márgenes fuera de una interfaz? Intenta con los ayudantes.
[Continuar →](helpers.md)
<!-- {p:.pull-box} -->

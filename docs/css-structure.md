# Estructura CSS

## Un component por archivo
Es recomendado ubicar cada componente en su propio archivo.

  ```scss
  /* css/components/search-form.scss */
  .search-form {
    > .button { /* ... */ }
    > .field { /* ... */ }
    > .label { /* ... */ }

    // variants
    &.-small { /* ... */ }
    &.-wide { /* ... */ }
  }
  ```

## Utilizar patrones glob
En sass-rails o en stylus, la siguiente instrucción incluye todos los componentes fácilmente:

  ```scss
  @import 'components/*';
  ```

## Evitar anidados excesivamente
No se debe de usar más de un nivel de anidamiento. Resulta fácil perderse si hay demasiados componentes anidados.

  ```scss
  /* ✗ Evitar: 3 niveles de  anidamiento */
  .image-frame {
    > .description {
      /* ... */

      > .icon {
        /* ... */
      }
    }
  }

  /* ✓ Mejor: 2 niveles */
  .image-frame {
    > .description { /* ... */ }
    > .description > .icon { /* ... */ }
  }
  ```

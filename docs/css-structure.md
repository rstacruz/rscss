# Estrutura CSS 

## Um componente por arquivo
Para cada componente, coloque eles em seus respectivos arquivos.

  ```scss
  /* css/components/search-form.scss */
  .search-form {
    > .button { /* ... */ }
    > .field { /* ... */ }
    > .label { /* ... */ }

    // variantes
    &.-small { /* ... */ }
    &.-wide { /* ... */ }
  }
  ```

## Use globo correspondente
O sass-rails e stylus facilitam a inclusão dos componentes:

  ```scss
  @import 'components/*';
  ```

## Evite multiplos aninhamento
Não use mais do que 1 nível de aninhamento. É fácil se perder quando se tem muitos aninhamentos.

  ```scss
  /* ✗ Evite: 3 níveis de aninhamento */
  .image-frame {
    > .description {
      /* ... */

      > .icon {
        /* ... */
      }
    }
  }

  /* ✓ Melhor: 2 níveis */
  .image-frame {
    > .description { /* ... */ }
    > .description > .icon { /* ... */ }
  }
  ```

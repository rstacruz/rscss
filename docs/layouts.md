# Layouts

![](images/layouts.png)

## Evite posicionar propriedades
Os componentes devem ser feitos de forma que sejam reutilizáveis ​​em diferentes contextos. Evite colocar essas propriedades em componentes:

  * Posicionamento (`position`, `top`, `left`, `right`, `bottom`)
  * Flutuadores (`float`, `clear`)
  * Margens (`margin`)
  * Dimensões (`width`, `height`) *

## Dimensões fixas

Exceção a estes seria elementos que tenham largura / alturas fixas, como avatares e logotipos.

## Defina o posicionamento nos pais

Se você precisar defini-las, tente defini-las em qualquer contexto em que elas estejam. Neste exemplo abaixo, observe que as larguras e os flutuadores são aplicados no componente *list*, não no próprio componente.

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

Como você aplica margens fora de um layout? Experimente com os Helpers.
[Continue →](helpers.md)
<!-- {p:.pull-box} -->

# Variantes

Componentes podem ter variantes. Os elementos podem ter variantes também.

![](images/component-modifiers.png)

<br>

## Nomeando variantes
Nomes de classes para variantes serão prefixados por um dash (`-`).

  ```scss
  .like-button {
    &.-wide { /* ... */ }
    &.-short { /* ... */ }
    &.-disabled { /* ... */ }
  }
  ```

## Variantes de elemento
Elementos também podem ter variantes.

  ```scss
  .shopping-card {
    > .title { /* ... */ }
    > .title.-small { /* ... */ }
  }
  ```

## Prefixos com Dash
Dashes são os ideais para prefixar variantes.

  * Isso evita a ambigüidade com elementos.
  * Uma classe CSS apenas pode iniciar com a letra `_` ou `-`.
  * Dashes são mais fáceis de digitar comparado ao underscore.
  * É parecido com switches nos comandos do UNIX (`gcc -O2 -Wall -emit-last`).

Como você lida com elementos complexos? Aninhe-os.
[Continue →](nested-components.md)
<!-- {p:.pull-box} -->

# Variants

Components may have variants. Elements may have variants, too.

![](images/component-modifiers.png)

<br>

## Naming variants
Classnames for variants will be prefixed by a dash (`-`).

  ```scss
  .like-button {
    &.-wide { /* ... */ }
    &.-short { /* ... */ }
    &.-disabled { /* ... */ }
  }
  ```

## Element variants
Elements may also have variants.

  ```scss
  .shopping-card {
    > .title { /* ... */ }
    > .title.-small { /* ... */ }
  }
  ```

## Dash prefixes
Dashes are the preferred prefix for variants.

  * It prevents ambiguity with elements.
  * A CSS class can only start with a letter, `_` or `-`.
  * Dashes are easier to type than underscores.
  * It kind of resembles switches in UNIX commands (`gcc -O2 -Wall -emit-last`).

How do you deal with complex components? Nest them.
[Continue →](nested-components.md)
<!-- {p:.pull-box} -->

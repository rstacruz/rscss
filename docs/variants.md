# Variants

![](images/component-modifiers.png)

Components may have variants. Elements may have variants, too.

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
  * a CSS class can only start with a letter, `_` or `-`.
  * dashes are easier to type than underscores.
  * it kind of resembles switches in UNIX commands (`gcc -O2 -Wall -emit-last`)

# Variants

Components may have variants. Elements may have variants, too.

![](images/component-modifiers.png)

<br>

## Naming variants
Classnames for variants will be prefixed by a dash (`-`). A variant may have more than one word, as long as they are joined by dashes.

```scss
.like-button {
  &.-wide { /*...*/ }
  &.-short { /*...*/ }
  &.-disabled { /*...*/ }
  &.-no-line { /*...*/ }
}
```

## Element variants
Both components and elements may have variants.

```scss
// Element variants
.shopping-cart {
  > .title { /*...*/ }
  > .title.-small { /*...*/ }
}

// Component variants
.shopping-cart.-inline {
  /* ... */
}
```

## Dash prefixes
Dashes are the preferred prefix for variants.

  * It prevents ambiguity with elements.
  * A CSS class can only start with a letter, `_` or `-`.
  * Dashes are easier to type than underscores.
  * It kind of resembles switches in UNIX commands (`gcc -O2 -Wall -emit-last`).

How do you deal with complex elements? Nest them.
[Continue →](nested-components.md)
<!-- {p:.pull-box} -->

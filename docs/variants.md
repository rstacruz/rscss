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
A dash is the preferred prefix for a variant because:

  * It prevents ambiguity with elements.
  * A CSS class name can only start with a letter, `_` or `-`.
  * A dash is easier to type than an underscore.
  * It kind of resembles switches in UNIX commands (`gcc -O2 -Wall -emit-last`).

How do you deal with complex elements? Nest them.
[Continue →](nested-components.md)
<!-- {p:.pull-box} -->

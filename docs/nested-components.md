# Nested components

![](images/component-nesting.png)

```html
<div class='article-link'>
  <div class='vote vote-box'>
    ...
  </div>
  <h3 class='title'>...</h3>
  <p class='meta'>...</p>
</div>
```

Sometimes it's necessary to nest components. Here are some guidelines for doing that.

## Avoid styling nested components
A component may need to appear a certain way when nested in another component. Avoid modifying the nested component by reaching into it from the containing component. This can cause problems with specificity.

```scss
.article-header {
  > .vote-box { } // ✗ avoid this
  > .vote-box > .up { } // ✗ avoid this
}
```

## Variants in nested components
Instead, prefer to add a variant to the nested component.

```html
<div class='article-header'>
  <div class='vote-box -highlight'>
    ...
  </div>
  ...
</div>
```

```scss
.vote-box {
  &.-highlight > .up { /* ... */ }
}
```

What about repeating elements like lists? Learn about Layouts.
[Continue →](layouts.md)
<!-- {p:.pull-box} -->

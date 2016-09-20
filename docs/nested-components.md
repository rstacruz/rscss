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

## Variants
A component may need to appear a certain way when nested in another component. Avoid modifying the nested component by reaching into it from the containing component.

```scss
.article-header {
  > .vote-box > .up { /* ✗ avoid this */ }
}
```

Instead, prefer to add a variant to the nested component and apply it from the containing component.

```html
<div class='article-header'>
  <div class='vote vote-box -highlight'>
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

## Sub-components as elements

To simplify, sub-components can appear as elements inside a parent component. In this example, `profile-info` is an element called `info` on the parent.

This avoids creating styles as nested components (`.profile-card > .profile-info`); simpler-looking selectors are prefered for brevity (`.profile-card > .info`).

```html
<div class='profile-card'>
  <div class='info profile-info'>
    ...
  </div>
</div>
```

What about repeating elements like lists? Learn about Layouts.
[Continue →](layouts.md)
<!-- {p:.pull-box} -->

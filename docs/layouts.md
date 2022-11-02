# Layouts

![](images/layouts.png)

Components should be built in a way that it can be reused in different places. To achieve this goal, components shouldn't define where they are to be placed; rather, positioning porperties should be defined in the parent component.

Layouts are a special kind of component that defines how other components are placed inside them.

## Define positioning in parents

In this example below, notice that the widths and floats are applied on the *list* component, not the component itself.

```css
/* ✗ Avoid: positioning properties placed in an component */
.article-card {
  width: 33.3%;
  float: left;
}
```

```css
/* ✓ Better: positioning propreties placed in elements */
.article-list {
  @include clearfix;

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

## Positioning properties
Avoid putting these properties in components. Instead, put them in elements of components.

  * Positioning (`position`, `top`, `left`, `right`, `bottom`)
  * Floats (`float`, `clear`)
  * Dimensions (`width`, `height`) *

## Fixed dimensions

Exception to these would be elements that have fixed width/heights, such as avatars and logos.

<!-- TODO: example -->

How do you apply margins outside a layout? Try it with Helpers.
[Continue →](helpers.md)
<!-- {p:.pull-box} -->

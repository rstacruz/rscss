# Layouts

![](images/layouts.png)

## Avoid positioning properties
Components should be made in a way that they're reusable in different contexts. Avoid putting these properties in components:

  * Positioning (`position`, `top`, `left`, `right`, `bottom`)
  * Floats (`float`, `clear`)
  * Margins (`margin`)
  * Dimensions (`width`, `height`) *

## Fixed dimensions

Exception to these would be elements that have fixed width/heights, such as avatars and logos.

## Define positioning in parents

If you need to define these, try to define them in whatever context they will be in. In this example below, notice that the widths and floats are applied on the *list* component, not the component itself.

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

How do you apply margins outside a layout? Try it with Helpers.
[Continue →](helpers.md)
<!-- {p:.pull-box} -->

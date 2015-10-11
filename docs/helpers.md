# Helpers

```css
._unmargin { margin: 0 !important; }
._center { text-align: center !important; }
._pull-left { float: left !important; }
._pull-right { float: right !important; }
```

For general-purpose classes meant to override values, put them in a separate file and name them beginning with an underscore. They are typically things that are tagged with *!important*. Use them *very* sparingly.

## Naming helpers
Prefix classnames with an underscore. This will make it easy to differentiate them from modifiers defined in the component. Underscores also look a bit ugly which is an intentional side effect: using too many helpers should be discouraged.

  ```html
  <div class='order-graphs -slim _unmargin'>
  </div>
  ```

## Organizing helpers
Place all helpers in one file called `helpers`. While you can separate them into multiple files, it's very preferrable to keep your number of helpers to a minimum.

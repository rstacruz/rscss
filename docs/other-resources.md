# Other resources

 * [ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss#49) ("Inverted Triangle CSS") is a nice complement to any rscss structure.
 * [rsjs](http://ricostacruz.com/rsjs/) ("Reasonable Standard of JavaScript Structure") is a work-in-progress document for structuring JavaScript on basic sites.

Other solutions
---------------

### BEM
[BEM] is nice, but some may be irked at its unconventional syntax. RSCSS pretty much follows BEM conventions, only with a different syntax.

```html
<!-- BEM -->
<form class='site-search site-search--full'>
  <input  class='site-search__field' type='text'>
  <button class='site-search__button'></button>
</form>
```

```html
<!-- rscss -->
<form class='site-search -full'>
  <input  class='field' type='text'>
  <button class='button'></button>
</form>
```

### Deep components

With BEM, you're allowed to have deep components where the DOM subtree can go down many levels deep. While this is true in RSCSS as well, the dependence on the child selector (`>`) makes this impractical.

This more of a feature than a defect in RSCSS: it forces you to create new components for deep hierarchies, making this more manageable. RSCSS's use of `>` also makes it easy to visualize a DOM structure based on CSS styles, leading to self-documenting code.

<!-- TODO: illustration -->

```css
/* BEM: ✓ allowed */
.site-search {
  &--icon { /*...*/ }
}
```

```css
/* RSCSS: ✗ confusing and impractical */
.site-search {
  > .top > .info > .label > .icon { /*...*/ }
}
```

```css
/* RSCSS: ✓ better to create sub-components for deep hierarchies */
.site-search-label {
  > .icon { /*...*/ }
}
```

## Terminologies

The same concepts exist in similar ways in other CSS structuring ideologies.

| RSCSS     | BEM      | SMACSS        |
| ---       | ---      | ---           |
| Component | Block    | Module        |
| Element   | Element  | Sub-Component |
| Layout    | ?        | Layout        |
| Variant   | Modifier | Sub-Module & State |

[BEM]: http://bem.info/
[Smacss]: https://smacss.com/

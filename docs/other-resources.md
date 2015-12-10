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

# Otros recursos

 * [ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss#49) ("Inverted Triangle CSS") es un buen complemento para la  estructura rscss.
 * [rsjs](http://ricostacruz.com/rsjs/) ("Reasonable Standard of JavaScript Structure") es un documento en progreso para estructurar JavaScript en sitios básicos.

Otras soluciones
---------------

### BEM
[BEM]  es agradable, pero algunos pueden ser irritados en su sintaxis poco convencional. RSCSS prácticamente sigue las convenciones BEM, sólo con una sintaxis diferente.

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

## Terminología

Los mismos conceptos existen de manera similar en otras ideologías estructurantes de CSS.

| RSCSS     | BEM      | SMACSS        |
| ---       | ---      | ---           |
| Component | Block    | Module        |
| Element   | Element  | Sub-Component |
| Layout    | ?        | Layout        |
| Variant   | Modifier | Sub-Module & State |

[BEM]: http://bem.info/
[Smacss]: https://smacss.com/

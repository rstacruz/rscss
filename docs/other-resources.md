# Other resources

 * [ITCSS](https://speakerdeck.com/dafed/managing-css-projects-with-itcss#49) ("Inverted Triangle CSS") é um bom complemento para qualquer estrutura rscss.
 * [rsjs](http://ricostacruz.com/rsjs/) ("Reasonable Standard of JavaScript Structure") é um documento que está em andamento para estruturar o JavaScript em sites básicos.

Outras soluções
---------------

### BEM
[BEM] é bom, mas alguns podem ficar irritados com sua sintaxe não convencional. O RSCSS praticamente segue as convenções do BEM, apenas com uma sintaxe diferente.


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

Os mesmos conceitos existem de formas semelhantes em outras ideologias de estruturação de CSS.

| RSCSS      | BEM         | SMACSS              |
| ---        | ---         | ---                 |
| Componente | Bloco       | Módulo              |
| Elemento   | Elemento    | Sub-Componente      |
| Layout     | ?           | Layout              |
| Variante   | Modificador | Sub-Módulo & Estado |

[BEM]: http://bem.info/
[Smacss]: https://smacss.com/

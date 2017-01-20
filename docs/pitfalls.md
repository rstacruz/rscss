Obstáculos

## Problemas  de componentes anidados
Tenga cuidado con los componentes  con elementos que tengan el mismo nombre que los elementos de su contenedor.


```html
<article class='article-link'>
 <div class='vote-box'>
    <button class='up'></button>
    <button class='down'></button>
    <span class='count'>4</span>
  </div>

  <h3 class='title'>Article title</h3>
  <p class='count'>3 votes</p>
</article>
```

```scss
.article-link {
  > .title { /* ... */ }
  > .count { /* ... (!!!) */ }
}

.vote-box {
  > .up { /* ... */ }
  > .down { /* ... */ }
  > .count { /* ... */ }
}
```

En este caso, si `.article-link> .count` no tiene el selector `> `(child), también se aplicará al elemento` .vote-box .count`. Esta es una de las razones por las que se prefieren los selectores directos.

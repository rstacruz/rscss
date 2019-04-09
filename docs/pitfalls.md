# Armadilhas

## Sofrendo com componentes aninhados

Tenha cuidado com componentes aninhados com elementos que compartilham o mesmo nome de elementos dentro do seu contêiner.

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

Nesse caso, se `.article-link > .count` não tivesse o `>` seletor filho, ele seria aplicado para o elemento `.vote-box .count`. Essa é uma das razões do porquê seletores filho são o ideal.
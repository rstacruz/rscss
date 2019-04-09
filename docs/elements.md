# Elementos

Elementos são coisas dentro do seu componente.

![](images/component-elements.png)

## Nomeando Elementos
Cada componente pode ter elementos. Eles deve ter classes com apenas **uma palavra**.

```scss
.search-form {
  > .field { /* ... */ }
  > .action { /* ... */ }
}
```

## Seletor nos Elementos
Dê preferência ao uso do seletor filho `>` sempre que possivel. Isso previne complicações nos componentes aninhados, e se comporta melhor nos seletores descendentes.

```scss
.article-card {
  .title     { /* okay */ }
  > .author  { /* ✓ melhor */ }
}
```

## Em multiplas palavras
Para essas que necessitam de duas ou mais palavras, concatene eles sem dashes ou underscores.

```scss
.profile-box {
  > .firstname { /* ... */ }
  > .lastname { /* ... */ }
  > .avatar { /* ... */ }
}
```

## Evite seletores de tag
Use nome de classes sempre que possível, seletores de Tag são bons, mas eles são pouco perfomáticos e podem não ser muito descritivos.

```scss
.article-card {
  > h3    { /* ✗ evite */ }
  > .name { /* ✓ melhor */ }
}
```

Nem todos elementos devem sempre parecer iguais. Variantes podem ajudar.
[Continue →](variants.md)
<!-- {p:.pull-box} -->

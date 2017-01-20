# Componentes anidados
![](images/component-nesting.png)

```html
<div class='article-link'>
  <div class='vote-box'>
    ...
  </div>
  <h3 class='title'>...</h3>
  <p class='meta'>...</p>
</div>
```

Aveces es necesario anidar componentes. He aquí algunas guías para hacer esto.

## Variantes
Un componente puede aparecer anidado dentro de otro componente. Se debe evitar modificar el componente que lo contiene para poder llegar al componente anidado.

```scss
.article-header {
  > .vote-box > .up { /* ✗ Evitar esto */ }
}
```

Es preferible agregar una variante al componente anidado y aplicarlo desde el componente que lo contiene.

```html
<div class='article-header'>
  <div class='vote-box -highlight'>
    ...
  </div>
  ...
</div>
```

```scss
.vote-box {
  &.-highlight > .up { /* ... */ }
}
```

## Simplificando componentes anidados
Aveces cuando anidamos componentes el código puede quedar un poco sucio:

```html
<div class='search-form'>
  <input class='input' type='text'>
  <button class='search-button -red -large'></button>
</div>
```

Esto se puede simplificar al usuario las funciones `@extend` que tienen algunos pre procesadores de CSS:

```html
<div class='search-form'>
  <input class='input' type='text'>
  <button class='submit'></button>
</div>
```

```scss
.search-form {
  > .submit {
    @extend .search-button;
    @extend .search-button.-red;
    @extend .search-button.-large;
  }
}
```

¿Y que hay de los elementos que se repiten como las listas? Veamos sobre las interfaces 
What about repeating elements like lists? Learn about Layouts.
[Continuar →](layouts.md)
<!-- {p:.pull-box} -->

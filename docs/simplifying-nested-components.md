# Simplifying nested components

Sometimes, when nesting components, your markup can get dirty:

```html
<div class='search-form'>
  <input class='input' type='text'>
  <button class='search-button -red -large'></button>
</div>
```

You can simplify this by refactoring your common component into mixins.

```scss
.search-button {
  @include search-button;

  &.-red {
    @include search-button-red;
  }

  &.-large {
    @include search-button-large;
  }
}
```

You can then use the mixins to style elements in your component.

```html
<div class='search-form'>
  <input class='input' type='text'>
  <button class='submit'></button>
</div>
```

```scss
.search-form {
  > .submit {
    @include search-button;
    @include search-button-red;
    @include search-button-large;
  }
}
```

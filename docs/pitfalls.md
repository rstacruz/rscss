# Pitfalls

## Bleeding through nested components
Be careful about nested components where the nested component has an element of the same name.

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

In this case, if `.article-link > .count` did not have the `>` (child) selector, it will also apply to the `.vote-box .count` element. This is one of the reasons why child selectors are preferred.

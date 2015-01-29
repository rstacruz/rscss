RSCSS
=====

Reasonable standard for CSS stylesheet structure.

This document is as work in progress.

Problem
-------

Any CSS greater than 1000 lines will get unwieldy. You'll eventually run into these common pitfalls:

* "What does this class mean?"
* "Is this class still being used?"
* "If I make a new class `green`, will there be a clash?"

Structure
---------

### Think in components

![](images/component-example.png)

Make sure that each piece of your UI is a component. Components will be named with **at least two words**, separated by a dash. Examples of a component:

* A like button (`.like-button`)
* A search form (`.search-form`)
* A news article card (`.article-card`)

### Elements

![](images/component-elements.png)

Each component may have elements. They should have classes that are only **one word**.

* `.search-form .field`
* `.search-form .label`
* `.article-card .title`
* `.article-card .author`

If you're going to use elements that don't have class names, make sure that you use the `>` descendant selectors so as to avoid clashes with sub-components.

* `.article-card > h3`

### Modifiers

![](images/component-modifiers.png)

Components may have modifiers. Modifiers will be prefixed by a dash (`-`).

* `.like-button.-wide`
* `.like-button.-disabled`

Elements may also have modifiers.

* `.shopping-cart .title.-small`

### Nested components

Sometimes it's necessary to nest components.

Other solutions
---------------

### BEM

[Bem] in nice but syntax is dirty. However, RSCSS pretty much follows BEM conventions, only with a different syntax.

[Smacss]: https://smacss.com/
[Bem]: http://bem.info/

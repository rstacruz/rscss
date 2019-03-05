# Helpers

Para propósito geral, classes significam sobrescrever valores, coloque eles em arquivos separados e nomeie eles começando com um underscore. Eles são tipicamente coisas que são marcadas como *!important*. Use eles com *muita* moderação.

```css
._unmargin { margin: 0 !important; }
._center { text-align: center !important; }
._pull-left { float: left !important; }
._pull-right { float: right !important; }
```

## Nomeando helpers

Prefixe nome de classes com um underscore. Isso fará com que fique fácil diferenciar eles dos modificadores definidos em um componente. Underscores são um pouco feios de se olhar, o que é um efeito colateral intencional: usar muitos helpers deve ser desencorajado.

  ```html
  <div class='order-graphs -slim _unmargin'>
  </div>
  ```

## Organizando helpers

Coloque todos os helpers em um arquivo chamado `helpers`. Enquanto você pode separar eles em vários arquivos, é preferível que você tenha um menor número de arquivos helpers possível.
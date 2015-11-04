(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* eslint-disable no-new */
var Pjax = require('pjax')
var Nprogress = require('nprogress')
var onmount = require('onmount')
var each = require('dom101/each')
var toggleClass = require('dom101/toggle-class')
var ready = require('dom101/ready')
var Scrolltrack = require('./scrolltrack')
var Scrollclass = require('./scrollclass')

/*
 * pjax/nprogress
 */

void (function () {
  ready(function () {
    new Pjax({
      selectors: ['.body', '.toc-menu', 'title']
    })
  })

  document.addEventListener('pjax:send', function () {
    Nprogress.start()
  })

  document.addEventListener('pjax:error', function () {
    Nprogress.done()
  })

  document.addEventListener('pjax:complete', function () {
    Nprogress.done()
  })
}())

/*
 * menu toggle
 */

onmount('.js-menu-toggle', function () {
  this.addEventListener('click', function () {
    toggleClass(document.body, '-menu-visible')
  })
})

/*
 * onmount
 */

void (function () {
  ready(function () {
    onmount()
  })

  document.addEventListener('pjax:complete', function () {
    onmount()
  })
}())

/*
 * scrolltrack
 */

void (function () {
  var st = new Scrolltrack({
    menu: '.toc-menu',
    selector: 'h2, h3',
    onupdate: function (active, last) {
      var menu = document.querySelector('.toc-menu')
      var link = menu.querySelector('.link.-active, .link.-notactive')

      toggleClass(link, '-active', !active)
      toggleClass(link, '-notactive', active)
    }
  })

  document.addEventListener('pjax:complete', function () {
    st.update()
  })

  ready(function () {
    st.update()
  })
}())

void(function () {
  onmount('.footer-nav', function (b) {
    b.sc = Scrollclass(this, {
      className: '-expanded',
      onscroll: function (y) {
        return this.maxScroll - y < 88
      }
    })
  }, function (b) {
    b.sc.destroy()
  })
}())

void(function () {
  onmount('.header-nav', function (b) {
    b.sc = Scrollclass(this, {
      className: '-expanded',
      onscroll: function (y) { return y < 40 }
    })
  }, function (b) {
    b.sc.destroy()
  })
}())

},{"./scrollclass":2,"./scrolltrack":3,"dom101/each":8,"dom101/ready":10,"dom101/toggle-class":13,"nprogress":14,"onmount":15,"pjax":16}],2:[function(require,module,exports){
var debounce = require('debounce')
var documentHeight = require('dom101/document-height')
var toggleClass = require('dom101/toggle-class')
var scrollTop = require('dom101/scroll-top')

/**
 * Listens for scrolling.
 * Available options:
 *
 * * `parent` (Element) — the parent to listen for scroll events to. Defaults
 *   to `document.`
 * * `className` (String) — classname to apply to the function.
 * * `onresize` (Function) — callback to run when the window resizes. Use
 *   this to cache metrics.
 * * `onscroll` (Function) — callback to run when scrolling. When this returns
 *   true, `className` will be applied; if false, it'll be removed.
 */

function Scrollclass (el, options) {
  if (!(this instanceof Scrollclass)) return new Scrollclass(el, options)
  if (!options) options = {}

  this.el = q(el)
  this.parent = q(options.parent || document)
  this.className = options.className || 'active'
  this.onresize = (options.onresize || noop).bind(this)
  this.onscroll = (options.onscroll || noop).bind(this)

  this._onscroll = debounce(this.poll.bind(this), 5)
  this._onresize = debounce(this.update.bind(this), 5)

  this.listen()
}

/**
 * Fires event listeners.
 */

Scrollclass.prototype.listen = function () {
  window.addEventListener('resize', this._onresize)
  window.addEventListener('resize', this._onscroll)
  document.addEventListener('load', this._onresize, true) // image events
  document.addEventListener('load', this._onscroll, true)
  this.parent.addEventListener('scroll', this._onscroll)
  this._onresize()
  this._onscroll()
}

/**
 * Destroys all event listeners.
 */

Scrollclass.prototype.destroy = function () {
  window.removeEventListener('resize', this._onresize)
  window.removeEventListener('resize', this._onscroll)
  document.removeEventListener('load', this._onresize, true)
  document.removeEventListener('load', this._onscroll, true)
  this.parent.removeEventListener('scroll', this._onscroll)
}

/**
 * Internal: Updates data on window resize. This sets some useful stuff that
 * can be used by the `onscroll` handler.
 */

Scrollclass.prototype.update = function () {
  this.documentHeight = documentHeight()
  this.winHeight = window.innerHeight
  this.maxScroll = this.documentHeight - this.winHeight
  this.onresize()
}

/**
 * Internal: scroll handler.
 */

Scrollclass.prototype.poll = function () {
  var result = this.onscroll(scrollTop())
  toggleClass(this.el, this.className, result)
}

function noop () {}

/**
 * Internal: helper to normalize between CSS selectors, DOM elements and
 * jQuery objects.
 */

function q (el) {
  if (typeof el === 'string') return document.querySelector(el)
  else if (typeof el === 'object' && el[0]) return el[0]
  else return el
}

module.exports = Scrollclass

},{"debounce":4,"dom101/document-height":7,"dom101/scroll-top":12,"dom101/toggle-class":13}],3:[function(require,module,exports){
var toggleClass = require('dom101/toggle-class')
var scrollTop = require('dom101/scroll-top')
var documentHeight = require('dom101/document-height')
var debounce = require('debounce')
var each = require('dom101/each')

/**
 * Tracks scrolling. Options:
 *
 * - `selectors` (String)
 * - `parent` (String) - where headings are. defaults to `document`
 * - `menu` (String | Element) - where links are.
 * - `scrollParent` (String | Element) - where to listen for scroll events.
 * - `onupdate` (Function) - callback to invoke when links change.
 */

function Scrolltrack (options) {
  if (!(this instanceof Scrolltrack)) return new Scrolltrack(options)
  if (!options) options = {}

  this.selector = options.selector || 'h1, h2, h3, h4, h5, h6'
  this.parent = options.parent || document
  this.onupdate = options.onupdate || function () {}
  this.menu = options.menu || document
  this.scrollParent = options.scrollParent || document
  this.offsetPercent = options.offsetPercent || 0.1

  this.listener = debounce(this.onScroll, 5).bind(this)
  this.update = debounce(this._update, 20).bind(this)
  this.active = undefined
  this.index = []

  this.listen()
  this.update()
}

/**
 * Internal: Attaches event listeners.
 * No need to call this; the constructor already does this.
 */

Scrolltrack.prototype.listen = function () {
  q(this.scrollParent).addEventListener('scroll', this.listener)
  document.addEventListener('load', this.update, true) // image events
  document.addEventListener('load', this.listener, true)
  window.addEventListener('resize', this.update)
  window.addEventListener('resize', this.listener)
}

/**
 * Stops listening for events.
 */

Scrolltrack.prototype.destroy = function () {
  q(this.scrollParent).removeEventListener('scroll', this.listener)
  document.removeEventListener('load', this.update, true)
  document.removeEventListener('load', this.listener, true)
  window.removeEventListener('resize', this.update)
  window.removeEventListener('resize', this.listener)
}

/**
 * Internal: Updates the index of the headings and links.
 * Used by `update()`.
 */

Scrolltrack.prototype.reindex = function () {
  var headings = this.parent.querySelectorAll(this.selector)
  var index = this.index = []
  var ids = {}

  var menu = q(this.menu)

  each(headings, function (heading) {
    var rect = heading.getBoundingClientRect()
    var id = heading.getAttribute('id')

    if (!ids[id]) ids[id] = 0
    else ids[id]++

    var links = menu.querySelectorAll('[href=' + JSON.stringify('#' + id) + ']')

    index.push({
      el: heading,
      id: id,
      link: links[ids[id]],
      top: rect.top + scrollTop()
    })
  })

  this.metrics = {
    windowHeight: window.innerHeight,
    documentHeight: documentHeight()
  }
}

/**
 * update : update()
 * Updates indices. Call this when the DOM changes.
 */

Scrolltrack.prototype._update = function () {
  this.reindex()
  this.onScroll()
}

/**
 * Internal: check for updates when scrolling. This is attached to the
 * document's scroll event.
 */

Scrolltrack.prototype.onScroll = function () {
  var y = this.scrollTop()
  var active

  each(this.index, function (heading) {
    if (heading.top < y) active = heading
  })

  if (active !== this.active) {
    var last = this.active
    this.active = active
    this.follow(active, last)
    this.onupdate(active, last)
  }
}

/**
 * Returns the scroll position. This also takes care of scaling it to go all
 * the way to the bottom.
 */

Scrolltrack.prototype.scrollTop = function () {
  var y = scrollTop()
  var offset = 0
  var k = this.offsetPercent

  if (this.metrics) {
    var screen = this.metrics.windowHeight
    var maxY = this.metrics.documentHeight - screen
    var fold = maxY - screen * 1.2

    if (y > fold) {
      var lastPercent = (y - fold) / screen
      offset = screen * (k + (1 - k) * lastPercent)
    } else {
      offset = screen * k
    }
  }

  return y + offset
}


/**
 * Updates the selected link.
 */

Scrolltrack.prototype.follow = function (heading, last) {
  if (this.lastlink) {
    toggleClass(this.lastlink, '-active', false)
    this.lastlink = null
  }

  if (heading && heading.link) {
    toggleClass(heading.link, '-active', true)
    this.lastlink = heading.link
  }
}

/**
 * Internal: helper to normalize between CSS selectors, DOM elements and
 * jQuery objects.
 */

function q (el) {
  if (typeof el === 'string') return document.querySelector(el)
  else if (typeof el === 'object' && el[0]) return el[0]
  else return el
}

module.exports = Scrolltrack

},{"debounce":4,"dom101/document-height":7,"dom101/each":8,"dom101/scroll-top":12,"dom101/toggle-class":13}],4:[function(require,module,exports){

/**
 * Module dependencies.
 */

var now = require('date-now');

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing.
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */

module.exports = function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = now() - timestamp;

    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function debounced() {
    context = this;
    args = arguments;
    timestamp = now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
};

},{"date-now":5}],5:[function(require,module,exports){
module.exports = Date.now || now

function now() {
    return new Date().getTime()
}

},{}],6:[function(require,module,exports){
/**
 * addClass : addClass(el, className)
 * Adds a class name to an element. Compare with `$.fn.addClass`.
 *
 *     var addClass = require('dom101/add-class');
 *
 *     addClass(el, 'active');
 */

function addClass (el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else {
    el.className += ' ' + className;
  }
}

module.exports = addClass;

},{}],7:[function(require,module,exports){
/**
 * documentHeight : documentHeight()
 * Returns the height of the document.
 * Compare with jQuery's `$(document).height()`.
 *
 *     var documentHeight = require('dom101/document-height');
 *
 *     var height = documentHeight();
 */

function documentHeight () {
  return Math.max(
    document.documentElement.clientHeight || 0,
    document.body.scrollHeight || 0,
    document.documentElement.scrollHeight || 0,
    document.body.offsetHeight || 0,
    document.documentElement.offsetHeight || 0);
}

module.exports = documentHeight;

},{}],8:[function(require,module,exports){
/**
 * each : each(list, fn)
 * Iterates through `list` (an array or an object). This is useful when dealing
 * with NodeLists like `document.querySelectorAll`.
 *
 *     var each = require('dom101/each');
 *     var qa = require('dom101/query-selector-all');
 *
 *     each(qa('.button'), function (el) {
 *       addClass('el', 'selected');
 *     });
 */

function each (list, fn) {
  var i;
  var len = list.length;
  var idx;

  if (typeof len === 'number') {
    for (i = 0; i < len; i++) {
      fn(list[i], i);
    }
  } else {
    idx = 0;
    for (i in list) {
      if (list.hasOwnProperty(i)) {
        fn(list[i], i, idx++);
      }
    }
  }

  return list;
}

module.exports = each;

},{}],9:[function(require,module,exports){
/**
 * hasClass : hasClass(el, className)
 * Checks if an element has a given class name.
 *
 *     var hasClass = require('dom101/has-class');
 *
 *     el.className = 'selected active';
 *     hasClass(el, 'active') //=> true
 */

function hasClass (el, className) {
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
}

module.exports = hasClass;

},{}],10:[function(require,module,exports){
/**
 * ready : ready(fn)
 * Executes `fn` when the DOM is ready.
 *
 *     var ready = require('dom101/ready');
 *
 *     ready(function () {
 *       ...
 *     });
 */

function ready (fn) {
  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function () {
      if (document.readyState === 'interactive') fn();
    });
  }
}

module.exports = ready;

},{}],11:[function(require,module,exports){
/**
 * removeClass : removeClass(el, className)
 * Removes a classname.
 *
 *     var removeClass = require('dom101/remove-class');
 *
 *     el.className = 'selected active';
 *     removeClass(el, 'active');
 *
 *     el.className
 *     => "selected"
 */

function removeClass (el, className) {
  if (el.classList) {
    el.classList.remove(className);
  } else {
    var expr =
      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');

    el.className = el.className.replace(expr, ' ');
  }
}

module.exports = removeClass;

},{}],12:[function(require,module,exports){

/**
 * scrollTop : scrollTop()
 * Returns the scroll top value.
 *
 *     var scrollTop = require('dom101/scroll-top');
 *     alert(scrollTop());
 */

function scrollTop () {
  if (window.pageYOffset) return window.pageYOffset;
  return document.documentElement.clientHeight
    ? document.documentElement.scrollTop
    : document.body.scrollTop;
}

// Taken from https://github.com/yields/scrolltop/blob/master/index.js
module.exports = scrollTop;

},{}],13:[function(require,module,exports){
/**
 * toggleClass : toggleClass(el, className, [value])
 * Adds or removes a class name to an element. If `value` is provided,
 * this will add the class if it's `true` or remove if it's `false`.
 * Compare with `$.fn.toggleClass`.
 *
 *     var toggleClass = require('dom101/toggle-class');
 *
 *     // toggles on or off:
 *     toggleClass(el, 'active');
 *
 *     // with a value:
 *     var isSelected = true;
 *     toggleClass(el, 'selected', isSelected);
 */

var addClass = require('./add-class');
var removeClass = require('./remove-class');
var hasClass = require('./has-class');

function toggleClass (el, className, value) {
  if (typeof value === 'undefined') {
    value = !hasClass(el, className);
  }

  return value
    ? addClass(el, className)
    : removeClass(el, className);
}

module.exports = toggleClass;

},{"./add-class":6,"./has-class":9,"./remove-class":11}],14:[function(require,module,exports){
/* NProgress, (c) 2013, 2014 Rico Sta. Cruz - http://ricostacruz.com/nprogress
 * @license MIT */

;(function(root, factory) {

  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.NProgress = factory();
  }

})(this, function() {
  var NProgress = {};

  NProgress.version = '0.2.0';

  var Settings = NProgress.settings = {
    minimum: 0.08,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.02,
    trickleSpeed: 800,
    showSpinner: true,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template: '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
  };

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  NProgress.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value !== undefined && options.hasOwnProperty(key)) Settings[key] = value;
    }

    return this;
  };

  /**
   * Last number.
   */

  NProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  NProgress.set = function(n) {
    var started = NProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    NProgress.status = (n === 1 ? null : n);

    var progress = NProgress.render(!started),
        bar      = progress.querySelector(Settings.barSelector),
        speed    = Settings.speed,
        ease     = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue(function(next) {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') Settings.positionUsing = NProgress.getPositioningCSS();

      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, { 
          transition: 'none', 
          opacity: 1 
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(function() {
          css(progress, { 
            transition: 'all ' + speed + 'ms linear', 
            opacity: 0 
          });
          setTimeout(function() {
            NProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  NProgress.isStarted = function() {
    return typeof NProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  NProgress.start = function() {
    if (!NProgress.status) NProgress.set(0);

    var work = function() {
      setTimeout(function() {
        if (!NProgress.status) return;
        NProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) work();

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  NProgress.done = function(force) {
    if (!force && !NProgress.status) return this;

    return NProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  NProgress.inc = function(amount) {
    var n = NProgress.status;

    if (!n) {
      return NProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return NProgress.set(n);
    }
  };

  NProgress.trickle = function() {
    return NProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  (function() {
    var initial = 0, current = 0;

    NProgress.promise = function($promise) {
      if (!$promise || $promise.state() === "resolved") {
        return this;
      }

      if (current === 0) {
        NProgress.start();
      }

      initial++;
      current++;

      $promise.always(function() {
        current--;
        if (current === 0) {
            initial = 0;
            NProgress.done();
        } else {
            NProgress.set((initial - current) / initial);
        }
      });

      return this;
    };

  })();

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  NProgress.render = function(fromStart) {
    if (NProgress.isRendered()) return document.getElementById('nprogress');

    addClass(document.documentElement, 'nprogress-busy');
    
    var progress = document.createElement('div');
    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;

    var bar      = progress.querySelector(Settings.barSelector),
        perc     = fromStart ? '-100' : toBarPerc(NProgress.status || 0),
        parent   = document.querySelector(Settings.parent),
        spinner;
    
    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)'
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      spinner && removeElement(spinner);
    }

    if (parent != document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress;
  };

  /**
   * Removes the element. Opposite of render().
   */

  NProgress.remove = function() {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    var progress = document.getElementById('nprogress');
    progress && removeElement(progress);
  };

  /**
   * Checks if the progress bar is rendered.
   */

  NProgress.isRendered = function() {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  NProgress.getPositioningCSS = function() {
    // Sniff on document.body.style
    var bodyStyle = document.body.style;

    // Sniff prefixes
    var vendorPrefix = ('WebkitTransform' in bodyStyle) ? 'Webkit' :
                       ('MozTransform' in bodyStyle) ? 'Moz' :
                       ('msTransform' in bodyStyle) ? 'ms' :
                       ('OTransform' in bodyStyle) ? 'O' : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) return min;
    if (n > max) return max;
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }


  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    var barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d('+toBarPerc(n)+'%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate('+toBarPerc(n)+'%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n)+'%' };
    }

    barCSS.transition = 'all '+speed+'ms '+ease;

    return barCSS;
  }

  /**
   * (Internal) Queues a function to be executed.
   */

  var queue = (function() {
    var pending = [];
    
    function next() {
      var fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return function(fn) {
      pending.push(fn);
      if (pending.length == 1) next();
    };
  })();

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery 
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it 
   * does not perform any manipulation of values prior to setting styles.
   */

  var css = (function() {
    var cssPrefixes = [ 'Webkit', 'O', 'Moz', 'ms' ],
        cssProps    = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, function(match, letter) {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      var style = document.body.style;
      if (name in style) return name;

      var i = cssPrefixes.length,
          capName = name.charAt(0).toUpperCase() + name.slice(1),
          vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) return vendorName;
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function(element, properties) {
      var args = arguments,
          prop, 
          value;

      if (args.length == 2) {
        for (prop in properties) {
          value = properties[prop];
          if (value !== undefined && properties.hasOwnProperty(prop)) applyCss(element, prop, value);
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    }
  })();

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    var list = typeof element == 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    var oldList = classList(element),
        newList = oldList + name;

    if (hasClass(oldList, name)) return; 

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    var oldList = classList(element),
        newList;

    if (!hasClass(element, name)) return;

    // Replace the class name.
    newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element. 
   * The list is wrapped with a single space on each end to facilitate finding 
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    element && element.parentNode && element.parentNode.removeChild(element);
  }

  return NProgress;
});


},{}],15:[function(require,module,exports){
/* global define */
void (function (root, factory) {
  if (typeof define === 'function' && define.amd) define(factory)
  else if (typeof exports === 'object') module.exports = factory()
  else {
    if (window.jQuery) window.jQuery.onmount = factory()
    else root.onmount = factory()
  }
}(this, function ($) {
  /*
   * Internal: Registry.
   */

  var handlers, behaviors, selectors, log

  /*
   * Internal: IDs for auto-incrementing.
   */

  var bid = 0 /* behavior ID */
  var cid = 0 /* component ID */

  /**
   * (Module) Adds a behavior, or triggers behaviors.
   *
   * When no parameters are passed, it triggers all behaviors. When one
   * parameter is passed, it triggers the given behavior. Otherwise, it adds a
   * behavior.
   *
   *     // define a behavior
   *     $.onmount('.select-box', function () {
   *       $(this).on('...')
   *     })
   *
   *     // define a behavior with exit
   *     $.onmount('.select-box', function () {
   *       $(document).on('...')
   *     }, function () {
   *       $(document).off('...')
   *     })
   *
   *     // retrigger a onmount
   *     $.onmount('.select-box')
   *
   *     // retriggers all behaviors
   *     $.onmount()
   */

  function onmount (selector, init, exit) {
    if (arguments.length === 0 || isjQuery(selector) || isEvent(selector)) {
      // onmount() - trigger all behaviors. Also account for cases such as
      // $($.onmount), where it's triggered with a jQuery event object.
      onmount.poll()
    } else if (arguments.length === 1) {
      // onmount(selector) - trigger for a given selector.
      onmount.poll(selector)
    } else {
      // onmount(sel, fn, [fn]) - register a new behavior.
      var be = new Behavior(selector, init, exit)
      behaviors.push(be)
      be.register()
    }

    return this
  }

  /*
   * Use jQuery (or a jQuery-like) when available. This will allow
   * the use of jQuery selectors.
   */

  onmount.$ = window.jQuery || window.Zepto || window.Ender

  /*
   * Detect MutationObserver support for `onmount.observe()`.
   * You may even add a polyfill here via
   * `onmount.MutationObserver = require('mutation-observer')`.
   */

  onmount.MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver

  /**
   * Set this to true if you want to see debug messages.
   */

  onmount.debug = false

  /**
   * Internal: triggers behaviors for a selector or for all.
   *
   *     onmount.poll()
   *     onmount.poll('.js-button')
   */

  onmount.poll = function poll (selector) {
    if (selector) selector = onmount.selectify(selector)
    var list = (selector ? selectors[selector] : handlers) || []
    each(list, function (item) { item() })
  }

  /**
   * Observes automatically using MutationObserver events.
   *
   *     onmount.observe()
   */

  onmount.observe = function observe () {
    var MutationObserver = onmount.MutationObserver
    if (typeof MutationObserver === 'undefined') return

    var obs = new MutationObserver(function (mutations) {
      each(behaviors, function (be) {
        each(mutations, function (mutation) {
          each(mutation.addedNodes, function (el) {
            if (matches(el, be.selector)) be.visitEnter(el)
          })

          each(mutation.removedNodes, function (el) {
            if (matches(el, be.selector)) be.visitExit(el)
          })
        })
      })
    })

    obs.observe(document, { subtree: true, childList: true })
    onmount.observer = obs

    // trigger everything before going
    onmount()
    return true
  }

  /**
   * Turns off observation first issued by `onmount.observe()`.
   */

  onmount.unobserve = function unobserve () {
    if (!this.observer) return
    this.observer.disconnect()
    delete this.observer
  }

  /**
   * Clears all behaviors. Useful for tests.
   * This will NOT call exit handlers.
   */

  onmount.reset = function reset () {
    handlers = onmount.handlers = []
    selectors = onmount.selectors = {}
    behaviors = onmount.behaviors = []
  }

  /**
   * Internal: Converts `@role` to `[role~="role"]` if needed. You can override
   * this by reimplementing `onmount.selectify`.
   *
   *     selectify('@hi')   //=> '[role="hi"]'
   *     selectify('.btn')  //=> '.btn'
   */

  onmount.selectify = function selectify (selector) {
    if (selector[0] === '@') {
      return '[role~="' + selector.substr(1).replace(/"/g, '\\"') + '"]'
    }
    return selector
  }

  /**
   * Internal: behavior class
   */

  function Behavior (selector, init, exit) {
    this.id = 'b' + bid++
    this.init = init
    this.exit = exit
    this.selector = onmount.selectify(selector)
    this.loaded = [] // keep track of dom elements loaded for this behavior
    this.key = '__onmount:' + bid // leave the state in el['__onmount:12']
  }

  /**
   * Internal: Register this behavior
   */

  Behavior.prototype.register = function () {
    var be = this
    var loaded = this.loaded
    var selector = this.selector

    register(selector, function () {
      // clean up old ones and initialize new ones
      each(loaded, function (element, i) {
        be.visitExit(element, i)
      })

      query(selector, function () {
        be.visitEnter(this)
      })
    })
  }

  /**
   * Internal: visits the element `el` and turns it on if applicable
   */

  Behavior.prototype.visitEnter = function (el) {
    if (el[this.key]) return
    var options = { id: 'c' + cid, selector: this.selector }
    if (this.init.call(el, options) !== false) {
      if (onmount.debug) log('enter', this.selector, el)
      el[this.key] = options
      this.loaded.push(el)
      cid++
    }
  }

  /**
   * Internal: visits the element `el` and sees if it needs its exit handler
   * called
   */

  Behavior.prototype.visitExit = function (el, i) {
    if (el && !isAttached(el)) {
      if (typeof i === 'undefined') i = this.loaded.indexOf(el)
      this.loaded[i] = undefined
      if (this.exit && this.exit.call(el, el[this.key]) !== false) {
        if (onmount.debug) log('exit', this.selector, el)
        delete el[this.key]
      }
    }
  }

  /**
   * Internal: check if an element is still attached to its document.
   */

  function isAttached (el) {
    while (el) {
      if (el === document.documentElement) return true
      el = el.parentElement
    }
  }

  /**
   * Internal: reimplementation of `$('...').each()`. If jQuery is available,
   * use it (I guess to preserve IE compatibility and to enable special jQuery
   * attribute selectors).
   */

  function query (selector, fn) {
    if (onmount.$) return onmount.$(selector).each(fn)

    var list = document.querySelectorAll(selector)
    for (var i = 0, len = list.length; i < len; i++) {
      fn.apply(list[i])
    }
  }

  /**
   * Internal: registers a behavior handler for a selector.
   */

  function register (selector, fn) {
    if (!selectors[selector]) selectors[selector] = []
    selectors[selector].push(fn)
    handlers.push(fn)
  }

  /**
   * Checks if a given element `el` matches `selector`.
   * Compare with [$.fn.is](http://api.jquery.com/is/).
   *
   *     var matches = require('dom101/matches');
   *
   *     matches(button, ':focus');
   */

  function matches (el, selector) {
    var _matches = el.matches ||
      el.matchesSelector ||
      el.msMatchesSelector ||
      el.mozMatchesSelector ||
      el.webkitMatchesSelector ||
      el.oMatchesSelector

    if (onmount.$) {
      return onmount.$(el).is(selector)
    } else if (_matches) {
      return _matches.call(el, selector)
    } else if (el.parentNode) {
      // IE8 and below
      var nodes = el.parentNode.querySelectorAll(selector)
      for (var i = nodes.length; i--; 0) {
        if (nodes[i] === el) return true
      }
      return false
    }
  }

  /**
   * Iterates through `list` (an array or an object). This is useful when dealing
   * with NodeLists like `document.querySelectorAll`.
   *
   *     var each = require('dom101/each');
   *     var qa = require('dom101/query-selector-all');
   *
   *     each(qa('.button'), function (el) {
   *       addClass('el', 'selected');
   *     });
   */

  function each (list, fn) {
    var i
    var len = list.length

    if (len === +len) {
      for (i = 0; i < len; i++) { fn(list[i], i) }
    } else {
      for (i in list) {
        if (list.hasOwnProperty(i)) fn(list[i], i)
      }
    }

    return list
  }

  /**
   * Internal: Check if a given object is jQuery
   */

  function isjQuery ($) {
    return typeof $ === 'function' && $.fn && $.noConflict
  }

  function isEvent (e) {
    return typeof e === 'object' && e.target
  }

  /**
   * Internal: logging
   */

  var styles = {
    enter: 'background-color:#dfd;font-weight:bold;color:#141',
    exit: 'background-color:#fdd;font-weight:bold;color:#411'
  }

  if (~navigator.userAgent.indexOf('Mozilla')) {
    log = function (type, selector, el) {
      console.log('%c %s ', styles[type], selector, el)
    }
  } else {
    log = function (type, selector, el) {
      console.log('(onmount)', type, selector)
    }
  }

  /*
   * Export
   */

  onmount.reset()
  return onmount
}))

},{}],16:[function(require,module,exports){
;(function(root, factory) {
  if (typeof exports === "object") {
    // CommonJS
    module.exports = factory()
  }
  else if (typeof define === "function" && define.amd) {
    // AMD
    define([], factory)
  }
  else {
    // Global Variables
    root.Pjax = factory()
  }
}(this, function() {
  "use strict";

  function newUid() {
    return (new Date().getTime())
  }

  var Pjax = function(options) {
      this.firstrun = true

      this.options = options
      this.options.elements = this.options.elements || "a[href], form[action]"
      this.options.selectors = this.options.selectors || ["title", ".js-Pjax"]
      this.options.switches = this.options.switches || {}
      this.options.switchesOptions = this.options.switchesOptions || {}
      this.options.history = this.options.history || true
      this.options.currentUrlFullReload = this.options.currentUrlFullReload || false
      this.options.analytics = this.options.analytics || function(options) {
        // options.backward or options.foward can be true or undefined
        // by default, we do track back/foward hit
        // https://productforums.google.com/forum/#!topic/analytics/WVwMDjLhXYk
        if (window._gaq) {
          _gaq.push(["_trackPageview"])
        }
        if (window.ga) {
          ga("send", "pageview", {"page": options.url, "title": options.title})
        }
      }
      this.options.scrollTo = this.options.scrollTo || 0
      this.options.debug = this.options.debug || false

      this.maxUid = this.lastUid = newUid()

      // we can’t replace body.outerHTML or head.outerHTML
      // it create a bug where new body or new head are created in the dom
      // if you set head.outerHTML, a new body tag is appended, so the dom get 2 body
      // & it break the switchFallback which replace head & body
      if (!this.options.switches.head) {
        this.options.switches.head = this.switchElementsAlt
      }
      if (!this.options.switches.body) {
        this.options.switches.body = this.switchElementsAlt
      }

      this.log("Pjax options", this.options)

      if (typeof options.analytics !== "function") {
        options.analytics = function() {}
      }

      this.parseDOM(document)

      Pjax.on(window, "popstate", function(st) {
        if (st.state) {
          var opt = Pjax.clone(this.options)
          opt.url = st.state.url
          opt.title = st.state.title
          opt.history = false

          if (st.state.uid < this.lastUid) {
            opt.backward = true
          }
          else {
            opt.forward = true
          }
          this.lastUid = st.state.uid

          // @todo implement history cache here, based on uid
          this.loadUrl(st.state.url, opt)
        }
      }.bind(this))

    }

  // make internal methods public
  Pjax.isSupported = function() {
    // Borrowed wholesale from https://github.com/defunkt/jquery-pjax
    return window.history &&
      window.history.pushState &&
      window.history.replaceState &&
      // pushState isn’t reliable on iOS until 5.
      !navigator.userAgent.match(/((iPod|iPhone|iPad).+\bOS\s+[1-4]\D|WebApps\/.+CFNetwork)/)
  }

  Pjax.forEachEls = function(els, fn, context) {
    if (els instanceof HTMLCollection || els instanceof NodeList) {
      return Array.prototype.forEach.call(els, fn, context)
    }
    // assume simple dom element
    fn.call(context, els)
  }

  Pjax.on = function(els, events, listener, useCapture) {
    events = (typeof events === "string" ? events.split(" ") : events)

    events.forEach(function(e) {
      Pjax.forEachEls(els, function(el) {
        el.addEventListener(e, listener, useCapture)
      })
    }, this)
  }

  Pjax.off = function(els, events, listener, useCapture) {
    events = (typeof events === "string" ? events.split(" ") : events)

    events.forEach(function(e) {
      Pjax.forEachEls(els, function(el) {
        el.removeEventListener(e, listener, useCapture)
      })
    }, this)
  }

  Pjax.trigger = function(els, events) {
    events = (typeof events === "string" ? events.split(" ") : events)

    events.forEach(function(e) {
      var event
      if (document.createEvent) {
        event = document.createEvent("HTMLEvents")
        event.initEvent(e, true, true)
      }
      else {
        event = document.createEventObject()
        event.eventType = e
      }

      event.eventName = e

      if (document.createEvent) {
        Pjax.forEachEls(els, function(el) {
          el.dispatchEvent(event)
        })
      }
      else {
        Pjax.forEachEls(els, function(el) {
          el.fireEvent("on" + event.eventType, event)
        })
      }
    }, this)
  }

  Pjax.clone = function(obj) {
    if (null === obj || "object" != typeof obj) {
      return obj
    }
    var copy = obj.constructor()
    for (var attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = obj[attr]
      }
    }
    return copy
  }

  // Finds and executes scripts (used for newly added elements)
  // Needed since innerHTML does not run scripts
  Pjax.executeScripts = function(el) {
    // console.log("going to execute scripts for ", el)
    Pjax.forEachEls(el.querySelectorAll("script"), function(script) {
      if (!script.type || script.type.toLowerCase() === "text/javascript") {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
        Pjax.evalScript(script)
      }
    })
  }

  Pjax.evalScript = function(el) {
    // console.log("going to execute script", el)

    var code = (el.text || el.textContent || el.innerHTML || "")
      , head = document.querySelector("head") || document.documentElement
      , script = document.createElement("script")

    if (code.match("document.write")) {
      if (console && console.log) {
        console.log("Script contains document.write. Can’t be executed correctly. Code skipped ", el)
      }
      return false
    }

    script.type = "text/javascript"
    try {
      script.appendChild(document.createTextNode(code))
    }
    catch (e) {
      // old IEs have funky script nodes
      script.text = code
    }

    // execute
    head.insertBefore(script, head.firstChild)
    head.removeChild(script) // avoid pollution

    return true
  }

  Pjax.prototype = {
    log: function() {
        if (this.options.debug && console) {
          if (typeof console.log === "function") {
            console.log.apply(console, arguments);
          }
          // ie is weird
          else if (console.log) {
            console.log(arguments);
          }
        }
      }

  , getElements: function(el) {
      return el.querySelectorAll(this.options.elements)
    }

  , parseDOM: function(el) {
      Pjax.forEachEls(this.getElements(el), function(el) {
        switch (el.tagName.toLowerCase()) {
        case "a": this.attachLink(el)
          break
        case "form":
          // todo
          this.log("Pjax doesnt support <form> yet. TODO :)")
          break
        default:
          throw "Pjax can only be applied on <a> or <form> submit"
        }
      }, this)
    }

  , attachLink: function(el) {
      Pjax.on(el, "click", function(event) {
        //var el = event.currentTarget

        // Don’t break browser special behavior on links (like page in new window)
        if (event.which > 1 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
          return -1
        }

        // Ignore external links.
        if (el.protocol !== window.location.protocol || el.host !== window.location.host) {
          return -2
        }

        // Ignore anchors on the same page
        if (el.pathname === location.pathname && el.hash.length > 0) {
          return -3
        }

        // Ignore anchors on the same page
        if (el.hash && el.href.replace(el.hash, "") === location.href.replace(location.hash, "")) {
          return -4
        }

        // Ignore empty anchor "foo.html#"
        if (el.href === location.href + "#") {
          return -5
        }

        event.preventDefault()

        if (this.options.currentUrlFullReload) {
          if (el.href === window.location.href) {
            window.location.reload()
            return -6
          }
        }

        this.loadUrl(el.href, Pjax.clone(this.options))
      }.bind(this))

      Pjax.on(el, "keyup", function(event) {
        this.log("pjax todo")
        // todo handle a link hitted by keyboard (enter/space) when focus is on it
      }.bind(this))
    }

  , forEachSelectors: function(cb, context, DOMcontext) {
      DOMcontext = DOMcontext || document
      this.options.selectors.forEach(function(selector) {
        Pjax.forEachEls(DOMcontext.querySelectorAll(selector), cb, context)
      })
    }

  , switchSelectors: function(selectors, fromEl, toEl, options) {
      selectors.forEach(function(selector) {
        var newEls = fromEl.querySelectorAll(selector)
        var oldEls = toEl.querySelectorAll(selector)
        this.log("Pjax switch", selector, newEls, oldEls)
        if (newEls.length !== oldEls.length) {
          // Pjax.forEachEls(newEls, function(el) {
          //   this.log("newEl", el, el.outerHTML)
          // }, this)
          // Pjax.forEachEls(oldEls, function(el) {
          //   this.log("oldEl", el, el.outerHTML)
          // }, this)
          throw "DOM doesn’t look the same on new loaded page: ’" + selector + "’ - new " + newEls.length + ", old " + oldEls.length
        }

        Pjax.forEachEls(newEls, function(newEl, i) {
          var oldEl = oldEls[i]
          this.log("newEl", newEl, "oldEl", oldEl)
          if (this.options.switches[selector]) {
            this.options.switches[selector].bind(this)(oldEl, newEl, options, this.options.switchesOptions[selector])
          }
          else {
            Pjax.switches.outerHTML.bind(this)(oldEl, newEl, options)
          }
        }, this)
      }, this)
    }

    // too much problem with the code below
    // + it’s too dangerous
  // , switchFallback: function(fromEl, toEl) {
  //     this.switchSelectors(["head", "body"], fromEl, toEl)
  //     // execute script when DOM is like it should be
  //     Pjax.executeScripts(document.querySelector("head"))
  //     Pjax.executeScripts(document.querySelector("body"))
  //   }

  , latestChance: function(href) {
      window.location = href
    }

  , onSwitch: function() {
      Pjax.trigger(window, "resize scroll")
    }

  , loadContent: function(html, options) {
      var tmpEl = document.implementation.createHTMLDocument("")

        // parse HTML attributes to copy them
        // since we are forced to use documentElement.innerHTML (outerHTML can't be used for <html>)
        , htmlRegex = /<html[^>]+>/gi
        , htmlAttribsRegex = /\s?[a-z:]+(?:\=(?:\'|\")[^\'\">]+(?:\'|\"))*/gi
        , matches = html.match(htmlRegex)
        if (matches && matches.length) {
          matches = matches[0].match(htmlAttribsRegex)
          if (matches.length) {
            matches.shift()
            matches.forEach(function(htmlAttrib) {
              var attr = htmlAttrib.trim().split("=")
              tmpEl.documentElement.setAttribute(attr[0], attr[1].slice(1, -1))
            })
          }
        }

      tmpEl.documentElement.innerHTML = html
      this.log("load content", tmpEl.documentElement.attributes, tmpEl.documentElement.innerHTML.length)
      // try {
        this.switchSelectors(this.options.selectors, tmpEl, document, options)

        // FF bug: Won’t autofocus fields that are inserted via JS.
        // This behavior is incorrect. So if theres no current focus, autofocus
        // the last field.
        //
        // http://www.w3.org/html/wg/drafts/html/master/forms.html
        var autofocusEl = Array.prototype.slice.call(document.querySelectorAll("[autofocus]")).pop()
        if (autofocusEl && document.activeElement !== autofocusEl) {
          autofocusEl.focus();
        }

        // execute scripts when DOM have been completely updated
        this.options.selectors.forEach(function(selector) {
          Pjax.forEachEls(document.querySelectorAll(selector), function(el) {
            Pjax.executeScripts(el)
          })
        })
      // }
      // catch(e) {
      //   if (this.options.debug) {
      //     this.log("Pjax switch fail: ", e)
      //   }
      //   this.switchFallback(tmpEl, document)
      // }
    }

  , doRequest: function(location, callback) {
      var request = new XMLHttpRequest()

      request.onreadystatechange = function() {
        if (request.readyState === 4 && request.status === 200) {
          callback(request.responseText)
        }
        else if (request.readyState === 4 && (request.status === 404 || request.status === 500)){
          callback(false)
        }
      }

      request.open("GET", location + (!/[?&]/.test(location) ? "?" : "&") + (new Date().getTime()), true)
      request.setRequestHeader("X-Requested-With", "XMLHttpRequest")
      request.send(null)
    }

  , loadUrl: function(href, options) {
      this.log("load href", href, options)

      Pjax.trigger(document, "pjax:send", options);

      // Do the request
      this.doRequest(href, function(html) {

        // Fail if unable to load HTML via AJAX
        if (html === false) {
          Pjax.trigger(document,"pjax:complete pjax:error", options)

          return
        }

        // Clear out any focused controls before inserting new page contents.
        document.activeElement.blur()

        try {
          this.loadContent(html, options)
        }
        catch (e) {
          if (!this.options.debug) {
            if (console && console.error) {
              console.error("Pjax switch fail: ", e)
            }
            this.latestChance(href)
            return
          }
          else {
            throw e
          }
        }

        if (options.history) {

          if (this.firstrun) {
            this.lastUid = this.maxUid = newUid()
            this.firstrun = false
            window.history.replaceState({
                "url": window.location.href
              , "title": document.title
              , "uid": this.maxUid
              }
            , document.title)
          }

          // Update browser history
          this.lastUid = this.maxUid = newUid()
          window.history.pushState({
              "url": href
            , "title": options.title
            , "uid": this.maxUid
            }
          , options.title
          , href)
        }

        this.forEachSelectors(function(el) {
          this.parseDOM(el)
        }, this)

        // Fire Events
        Pjax.trigger(document,"pjax:complete pjax:success", options)

        options.analytics()

        // Scroll page to top on new page load
        if (options.scrollTo !== false) {
          if (options.scrollTo.length > 1) {
            window.scrollTo(options.scrollTo[0], options.scrollTo[1])
          }
          else {
            window.scrollTo(0, options.scrollTo)
          }
        }
      }.bind(this))
    }
  }

  Pjax.switches = {
    outerHTML: function(oldEl, newEl, options) {
      oldEl.outerHTML = newEl.outerHTML
      this.onSwitch()
    }

  , innerHTML: function(oldEl, newEl, options) {
      oldEl.innerHTML = newEl.innerHTML
      oldEl.className = newEl.className
      this.onSwitch()
    }

  , sideBySide: function(oldEl, newEl, options, switchOptions) {
      var forEach = Array.prototype.forEach
        , elsToRemove = []
        , elsToAdd = []
        , fragToAppend = document.createDocumentFragment()
        // height transition are shitty on safari
        // so commented for now (until I found something ?)
        // , relevantHeight = 0
        , animationEventNames = "animationend webkitAnimationEnd MSAnimationEnd oanimationend"
        , animatedElsNumber = 0
        , sexyAnimationEnd = function(e) {
            if (e.target != e.currentTarget) {
              // end triggered by an animation on a child
              return
            }

            animatedElsNumber--
            if (animatedElsNumber <= 0 && elsToRemove) {
              elsToRemove.forEach(function(el) {
                // browsing quickly can make the el
                // already removed by last page update ?
                if (el.parentNode) {
                  el.parentNode.removeChild(el)
                }
              })

              elsToAdd.forEach(function(el) {
                el.className = el.className.replace(el.getAttribute("data-pjax-classes"), "")
                el.removeAttribute("data-pjax-classes")
                // Pjax.off(el, animationEventNames, sexyAnimationEnd, true)
              })

              elsToAdd = null // free memory
              elsToRemove = null // free memory

              // assume the height is now useless (avoid bug since there is overflow hidden on the parent)
              // oldEl.style.height = "auto"

              // this is to trigger some repaint (example: picturefill)
              this.onSwitch()
              //Pjax.trigger(window, "scroll")
            }
          }.bind(this)

      // Force height to be able to trigger css animation
      // here we get the relevant height
      // oldEl.parentNode.appendChild(newEl)
      // relevantHeight = newEl.getBoundingClientRect().height
      // oldEl.parentNode.removeChild(newEl)
      // oldEl.style.height = oldEl.getBoundingClientRect().height + "px"

      switchOptions = switchOptions || {}

      forEach.call(oldEl.childNodes, function(el) {
        elsToRemove.push(el)
        if (el.classList && !el.classList.contains("js-Pjax-remove")) {
          // for fast switch, clean element that just have been added, & not cleaned yet.
          if (el.hasAttribute("data-pjax-classes")) {
            el.className = el.className.replace(el.getAttribute("data-pjax-classes"), "")
            el.removeAttribute("data-pjax-classes")
          }
          el.classList.add("js-Pjax-remove")
          if (switchOptions.callbacks && switchOptions.callbacks.removeElement) {
            switchOptions.callbacks.removeElement(el)
          }
          if (switchOptions.classNames) {
            el.className += " " + switchOptions.classNames.remove + " " + (options.backward ? switchOptions.classNames.backward  : switchOptions.classNames.forward)
          }
          animatedElsNumber++
          Pjax.on(el, animationEventNames, sexyAnimationEnd, true)
        }
      })

      forEach.call(newEl.childNodes, function(el) {
        if (el.classList) {
          var addClasses = ""
          if (switchOptions.classNames) {
            addClasses = " js-Pjax-add " + switchOptions.classNames.add + " " + (options.backward ? switchOptions.classNames.forward : switchOptions.classNames.backward)
          }
          if (switchOptions.callbacks && switchOptions.callbacks.addElement) {
            switchOptions.callbacks.addElement(el)
          }
          el.className += addClasses
          el.setAttribute("data-pjax-classes", addClasses)
          elsToAdd.push(el)
          fragToAppend.appendChild(el)
          animatedElsNumber++
          Pjax.on(el, animationEventNames, sexyAnimationEnd, true)
        }
      })

      // pass all className of the parent
      oldEl.className = newEl.className
      oldEl.appendChild(fragToAppend)

      // oldEl.style.height = relevantHeight + "px"
    }
  }

  if (Pjax.isSupported()) {
    return Pjax
  }
  // if there isn’t required browser functions, returning stupid api
  else {
    var stupidPjax = function() {}
    for (var key in Pjax.prototype) {
      if (Pjax.prototype.hasOwnProperty(key) && typeof Pjax.prototype[key] === "function") {
        stupidPjax[key] = stupidPjax
      }
    }

    return stupidPjax
  }

}));

},{}]},{},[1]);

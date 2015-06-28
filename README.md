# DotCanvas

***

## Contents

 * [About](#about)
 * [License](#license)
 * [How to use](#how-to-use)
   * [Drawing](#drawing)
   * [Modify code](#modify-code)
 * [Further development](#further-development)

***

## About

A small HTML5 “drawing app” inspired by [the stamps designed by Kohei Sugiura](http://text-mode.tumblr.com/post/119452515321/olympic-games-stamps-by-kohei-sugiura-1972-via) for the 1972 Sapporo Winter Olympics.

## License

This project, unless noted otherwise, is licensed under the MIT License. For the full license, see [`LICENSE`](LICENSE). Copyright © 2015 Istvan Szantai \<szantaii at sidenote dot hu\>.

jQuery JavaScript Library v2.1.4 Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors, released under the [MIT license](http://jquery.org/license).

## How to use

### Drawing

Click on any dot (actually inside the maximum radius of a dot) to make it grow. If it has reached its maximum radius given in the code at the next click it will shrink to its minimum radius. That's it, happy drawing!

Oh, yes… you can save your drawing either in [PNG](http://www.w3.org/TR/PNG/) or [SVG](http://www.w3.org/Graphics/SVG/) formats (works in most browsers).

### Modify code

You can create your canvas by instantiating the following Canvas object.

```javascript
function Canvas(elementId, horizintalDotCount, verticalDotCount, minRadius, maxRadius, radiusSteps);
```

You have to provide the following arguments:

 * `elementId`: the element ID where the canvas will be drawn on the HTML page
 * `horizintalDotCount`: the number of dots horizontally
 * `verticalDotCount`: the number of dots vertically
 * `minRadius`: the minimum radius of the dots
 * `maxRadius`: the maximum radius of the dots
 * `radiusSteps`: the number of mouse clicks for a dot to reach from the minimum to the maximum radius

E.g.

```javascript
var canvas = new Canvas("canvas", 24, 24, 1, 16, 5);
```

I am sure you will be able to figure out the rest.

## Further development

 * Internet Explorer compatibility (though not sure if I am ever going to do it)

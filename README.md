# ***Fncache***
> ##### Snippet Package Manager by SpicySpices

***
The node package manager is a great tool, it allows for entire scripts of code to be ran in a single line of code. It is a great tool to use in any Node.js project. Although NPM's power is unmatched, it is much too excessive for minute usage.

Take an example, imagine a user is trying to create a 3 dimensional rendering engine. There are many things to calculate, rotation matrices, 3d points to ordered pairs on a screen - the point is that there are many functions that need to be created for a simple creation. The user would also like these functions to be written with utmost precision and speed. A solution for all of these problems would be **Fncache**.

Fncache is an NPM package and website with the purpose of being an easy way to retrieve small functions without the trouble of going through the process of installing NPM packages. It is basically the node package manager, but for smaller functions and with more ease. Need to check if a number is prime using the quickest known algorithm? `fn.isPrime(22679)` BOOM, there is a function for that. Need to send a GET request to your server? `fn.getRequest(url)` BOOM, a function for that.

Any function that can be written is a function that can be created in Fncache. No matter whether it is asynchronous, returns a value, or takes 10 minutes to resolve, any function can be added to Fncache, even ones containing other functions.

***

## Process
Now knowing what Fncache is, how do we implement it? It is a simple process, but first it is necessary to download the NPM package for Fncache
`npm i fncache`
We can then add a require or import statement into the code
```js
const fn = require('fncache');
```
After that, we need to use await on a starter Fncache function, with a parameter being the node file that is running.
```js
await fn('index.js');
```
With that done, we can use any function in the Fncache library.
```js
console.log(fn.add(5483, 3395)); // Logs '8878'
```
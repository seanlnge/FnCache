# ***FnCache***
> ##### Snippet Package Manager by SpicySpices

***
The node package manager is a great tool, it allows for entire scripts of code to be ran in a single line of code. It is a great tool to use in any Node.js project. Although NPM's power is unmatched, it is much too excessive for minute usage.

Take an example, imagine a user is trying to create a 3 dimensional rendering engine. There are many things to calculate, rotation matrices, 3d points to ordered pairs on a screen - the point is that there are many functions that need to be created for a simple creation. The user would also like these functions to be written with utmost precision and speed. A solution for all of these problems would be **FnCache**.
***
## What is FnCache
FnCache is an NPM package and website with the purpose of being an easy way to retrieve small functions without the trouble of going through the process of installing NPM packages. It is basically the node package manager, but for smaller functions and with more ease. Need to check if a number is prime using the quickest known algorithm? `fn.isPrime(22679)` BOOM, there is a function for that. Need to send a GET request to your server? `fn.getRequest(url)` BOOM, a function for that.

Any function that can be written is a function that can be created in FnCache. No matter whether it is asynchronous, returns a value, or takes 10 minutes to resolve, any function can be added to FnCache, even ones containing other functions.

***

## Installation
Now knowing what FnCache is, how do we implement it? It is a simple process, but first it is necessary to download the NPM package for FnCache
`npm i @spicyspices/fncache`
We can then add a require or import statement into the code
```js
const fn = require('@spicyspices/fncache');
```
After that, we need to use await on a starter FnCache function, with a parameter being the node file that is running, and the variable that FnCache is saved to.
```js
await fn('index.js', 'fn');
```
With that done, we can use any function in the FnCache library.
```js
console.log(fn.add(5483, 3395)); // Logs '8878'
```
***
## Usage
Getting a function is as simple as typing `fn.` and then whatever function you desire to use. For instance, if you were to have a dice roller, you could enter `let diceRoll = fn.randomInt(1, 6);`, and then variable diceRoll would become a random integer from 1 to 6. There are many functions and they are all catalogued on [this website](https://Code-Jam-10.spicedspices.repl.co)

Creating a function is also very simple. There are 2 ways to do so, either by using the website directly, or manually doing it by using code. The website is very straight-forward, so I will not explain that, but the code is a bit different. To create a function, everything will need to be setup to start. Next you will need to write `fn.set()` this will take 3 required parameters and a callback. These parameters are desired function name, current function, and description. The callback will need an error and data parameters. After following these, it should look something like this:
```js
function divBy2(x){
    return x % 2 == 0;
}

fn.set('isEven', divBy2, "Check if given argument is even", (err, data) => {
    if(err) throw err;
    console.log(data);
})
```

***
## Test Programs
**Random String Generator**
```js
const fn = require('@spicyspices/fncache');

async function main(){
    await fn('index.js', 'fn');

    let str = '';
    for(let i = 0; i < 8; i++){
        let random = fn.randomInt(65, 122);
        str += fn.intToChar(random);
    }

    console.log(str);
}

main();
```

**Creating a Sleep Function**
```js
const fn = require('@spicyspices/fncache');

async function main(){
    await fn('index.js', 'fn');

    fn.set('sleep', sleep, 'An asynchronous function that only finishes once a timespan (ms) has passed', (err, data) => {
        if(err) throw err;
        console.log(data);
    });
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

main();
```

**Simulating a Roll of Die**
```js
const fn = require('@spicyspices/fncache');

async function main(){
    await fn('index.js', 'fn');

    let sides = 20;
    let amount = 4;
    let rolls = [];

    for(let i = 0; i < amount; i++){
        rolls.push(fn.randomInt(1, 20));
    }

    console.log(rolls);
}

main();
```

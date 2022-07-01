## npm.js
 > ***Scrape npm.js website using open API and npm.js window.context data***
 
[![Issues](https://img.shields.io/github/issues/i-scrapper/npm.js)](https://github.com/i-scrapper/npm.js/issues) 
[![Stars](https://badgen.net/github/stars/i-scrapper/npm.js)](https://github.com/i-scrapper/npm.js/stargazers/)
![MIT License](https://img.shields.io/badge/license-MIT-blue)

## Table Of Contents

* [Installation](#installation)
* [Usage](#usage)
* [Built With](#built-with)
* [Support](#support)

## Installation

> npm install npm.js

## Usage

```javascript
const iNpm = require("@i-scrapper/npm.js");

// iNpm object exported
console.log(iNpm);

// iNpm call a function
iNpm.user("i-scrapper")
    .then((data) => {
        console.log(data);
    })
    .catch(console.error);

// view content of iNpm function
console.log(iNpm.user.toString());
```

## Built With

* JavaScript
* Node.js

## Support

```diff
+ dont forget to star <3
! contribute to this project! ~~~
- please add issue if you having problem with installation

! github: https://github.com/i-scrapper/npm.js
```
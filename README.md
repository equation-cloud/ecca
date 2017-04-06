# ecca

**ecca** is the symbolic math library for Equation Cloud, it handles the parsing of mathmatical expressions, the simplification and manipulation of expression trees and conversion of expression trees into TeX strings.

[![npm](https://img.shields.io/npm/v/ecca.svg)](https://www.npmjs.com/package/ecca)
[![Build Status](https://api.travis-ci.org/equation-cloud/ecca.svg?branch=master)](https://travis-ci.org/equation-cloud/ecca)
[![Coverage Status](https://img.shields.io/coveralls/equation-cloud/ecca.svg)](https://coveralls.io/github/equation-cloud/ecca?branch=master)
[![Dependency status](https://david-dm.org/equation-cloud/ecca.svg)](https://david-dm.org/equation-cloud/ecca)

## Table of Contents

- [Install](#install)
- [Example](#example)

## Install

```sh
$ npm install mysql
```

## Example

```sh
let ecca = require('ecca')
console.log(new ecca.Expression('y=x^2').ElementTree)
```

Will output the correct expression tree:

```sh
EqualsElement {
  type: 'equals',
  operands: [
    IdentifierElement { type: 'identifier', identifier: 'y' },
    PowerElement { type: 'power', operands: [Object] } 
  ]
}
```

# ecca

**ecca** is the symbolic math library for Equation Cloud, it handles the parsing of mathmatical expressions, the simplification and manipulation of expression trees and conversion of expression trees into TeX strings.

[![npm](https://img.shields.io/npm/v/ecca.svg)](https://www.npmjs.com/package/ecca)
[![Build Status](https://api.travis-ci.org/equation-cloud/ecca.svg?branch=master)](https://travis-ci.org/equation-cloud/ecca)
[![Coverage Status](https://img.shields.io/coveralls/equation-cloud/ecca.svg)](https://coveralls.io/github/equation-cloud/ecca?branch=master)
[![Dependency status](https://david-dm.org/equation-cloud/ecca.svg)](https://david-dm.org/equation-cloud/ecca)

## Table of Contents

- [Install](#install)
- [Parsing](#parsing)
- [Elements](#elements)
- [Tex Output](#tex-output)

## Install

```sh
$ npm install ecca
```

## Parsing

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

## Elements

The following elements are currently supported

| Element Name       | Type     | Parameters             | Notes                                                 |
|:------------------ | -------- |:---------------------- |:----------------------------------------------------- |
| IntegerElement     | Value    | Value                  | Can only be positive                                  |
| FractionElement    | Value    | Numerator, Denominator | Both values will only be positive                     |
| IdentifierElement  |          | Identifier             | Will represent either variables or constants          |
| EqualsElement      | Operator | Operands               | Can only have two operands                            |
| SubtractionElement | Operator | Operands               | Can only have two operands                            |
| SumElement         | Operator | Operands               | Operands can be any length                            |
| ProductElement     | Operator | Operands               | Operands can be any length                            |
| DivisionElement    | Operator | Operands               | Can only have two operands                            |
| PowerElement       | Operator | Operands               | Can only have two operands                            |
| NegateElement      | Operator | Operands               | Can only have one operands, used for negative numbers |
| BracketsElement    | Operator | Operands               | Can only have one operands                            |

## TeX Output

To convert an expression into the TeX representation the following code could be used

```sh
let ecca = require('ecca')
let expression = new ecca.Expression('y=x^2')
let texString = generateRawTeX(expression)
```

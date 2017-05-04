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
- [Variables](#variables)
- [Tex Output](#tex-output)

## Install

```sh
npm install ecca
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

| Element Name       | Type       | Parameters             | Notes                                                 |
|:------------------ | ---------- |:---------------------- |:----------------------------------------------------- |
| IntegerElement     | Value      | Value                  | Can only be positive                                  |
| FractionElement    | Value      | Numerator, Denominator | Both values will only be positive                     |
| IdentifierElement  |            | Identifier             | Will represent either variables or constants          |
| FunctionElement    | Identifier | Identifier, Operands   | Operands can be of any length                         |
| BracketsElement    | Operator   | Operands               | Can only have one operand                             |
| NegateElement      | Operator   | Operands               | Can only have one operands, used for negative numbers |
| FactorialElement   | Operator   | Operands               | Can only have one operand                             |
| PowerElement       | Operator   | Operands               | Can only have two operands                            |
| DivisionElement    | Operator   | Operands               | Can only have two operands                            |
| ProductElement     | Operator   | Operands               | Operands can be any length                            |
| SumElement         | Operator   | Operands               | Operands can be any length                            |
| SubtractionElement | Operator   | Operands               | Can only have two operands                            |
| EqualsElement      | Operator   | Operands               | Can only have two operands                            |

## Variables

Any identifer will be automatically assigned to be a variable, with details of each variable stored in a Variable class, and returned as an element of the ReadonlyArray&lt;Variable&gt; Expression.Variables. The Variable class contains the name of the variable and an array of elements which are this variable in the expression. The identified variables are also assigned string ids as part of the element.

## TeX Output

To convert an expression into the TeX representation the following code could be used

```sh
let ecca = require('ecca')
let expression = new ecca.Expression('y=x^2/4')
let texString = generateRawTeX(expression)
```

will give the output 

```sh
y=\frac{x^{2}}{4}
```

It is also possible to output a decorated TeX string, useful for libraries such as MathJax where the \cssId{id}{...} tag is used around any elements which have a associated id set. To convert the expression into such a decorated string the function generateDecoratedTeX(expression) should be used instead, the above example would then output the following 

```sh
\cssId{y0}{y}=\frac{\cssId{x0}{x}^{2}}{4}
```

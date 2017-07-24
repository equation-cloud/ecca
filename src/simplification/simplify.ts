import { Expression } from './../expression'
import {
  IElement,
  IdentifierElement,
  ValueElement,
  IntegerElement,
  FractionalElement,
  UndefinedElement,
  OperatorElement,
  BracketsElement,
  NegateElement,
  PowerElement,
  DivisionElement,
  ProductElement,
  SumElement,
  SubtractionElement,
  EqualsElement
} from './../elements'

// Functions to deal with rational numbers

function greatestCommonDenominator(a: number, b: number) : number
{
  while(b > 0) {
    let remainder = a % b;
    a = b;
    b = remainder;
  }
  return a;
}

export function simplifyRationalNumber(element: FractionalElement | IntegerElement) : FractionalElement | IntegerElement
{
  if(element instanceof FractionalElement) {
    let remainder = element.numerator % element.denominator;
    if (remainder === 0) {
      return new IntegerElement(Math.floor(element.numerator / element.denominator).toFixed(0));
    } else {
      let gcd = greatestCommonDenominator(element.numerator, element.denominator);
      return new FractionalElement(element.numerator / gcd, element.denominator / gcd);
    }
  } else {
    return element;
  }
}

export function simplifyRationalNumberExpression(element: IElement) : IntegerElement | FractionalElement | UndefinedElement
{
  let simplifiedExpression = simplifyRationalNumberExpressionRecursive(element)
  if (simplifiedExpression.type === 'undefined') {
    return simplifiedExpression
  }
  return simplifyRationalNumber(simplifiedExpression)
}

export function simplifyRationalNumberExpressionRecursive(element: IElement) : IntegerElement | FractionalElement | UndefinedElement
{
  if (element instanceof IntegerElement) {
    return element
  }
  if (element instanceof FractionalElement) {
    if (element.denominator === 0) {
      return new UndefinedElement()
    } else {
      return element
    }
  }
  console.log(element)
  if (element.operands.length === 1) {
    let simplifiedOperand = simplifyRationalNumberExpressionRecursive(element.operands[0])
    console.log(simplifiedOperand)
    if (simplifiedOperand.type === 'undefined') {
      console.log('Here')
      return new UndefinedElement()
    } else if (element instanceof SumElement) {
      return simplifiedOperand
    } else if (element instanceof SubtractionElement) {
      return evaluateProduct(new IntegerElement('-1'), simplifiedOperand)
    }
  }
  throw new Error('Not implemented')
}

function evaluateProduct(left: IntegerElement | FractionalElement, right: IntegerElement | FractionalElement) {
  if (left instanceof IntegerElement) {
    if (right instanceof IntegerElement) {
      return new IntegerElement(left.value * right.value)
    }
  }
}

// Functions to deal with powers

function simplifyIntegerPower(element: PowerElement) : IElement {
  throw new Error('Not implemented')
}

export function simplifyPower(element: PowerElement) : IElement {
  //SPOW-1
  if(element.operands[0].type === 'undefined' || element.operands[1].type === 'undefined') {
    return new UndefinedElement();
  }
  //SPOW-2
  let firstOperand = element.operands[0];
  if (firstOperand.type === 'integer' && firstOperand.value === 0) {
    let secondOperand = element.operands[1];
    if (
      (secondOperand.type === 'integer' && secondOperand.value > 0) ||
      (secondOperand.type === 'fractional')
    ) {
      return new IntegerElement('0');
    } else {
      return new UndefinedElement();
    }
  }
  //SPOW-3
  if(element.operands[0].type === 'integer' && element.operands[0].value === 1) {
    return new IntegerElement('1');
  }
  //SPOW-4
  if(element.operands[1].type === 'integer') {
    return simplifyIntegerPower(element);
  }
  //SPOW-5
  return element;
}

// Simplifying Products

export function simplifyProductRecursive(operands : IElement[]) : IElement[] {
  throw new Error('Not Implemented');
}

function simplifyProduct(ProductElement : IElement) : IElement {
  throw new Error('Not implemented');
}

function simplifyElement(element : IElement) : IElement {
  if(element.operands) {
    element.operands = element.operands.map(operand => simplifyElement(operand))
  }
  switch(element.type){
    case 'identifier':
    case 'integer':
    case 'negate':
    case 'undefined':
      return element;
    case 'fractional':
      return simplifyRationalNumber(<FractionalElement>element)
    case 'power':
      return simplifyPower(<PowerElement>element)
    default:
      throw new Error(element.type + ' not implemented')
  }
}

export function simplify(input : IElement | Expression) : IElement {
  if (input instanceof Expression) {
    return simplifyElement(input.ElementTree)
  } else {
    return simplifyElement(input)
  }
}
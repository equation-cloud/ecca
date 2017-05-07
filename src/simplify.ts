import { Expression } from './expression'
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
} from './elements'

function simplifyRationalNumber(element: FractionalElement) : IElement
{
}

function simplifyIntegerPower(element: PowerElement) : IElement {
  throw new Error('Not implemented')
}

function simplifyPower(element: PowerElement) : IElement {
  //SPOW-1
  if(element.operands[0].type === 'undefined' || element.operands[1].type == 'undefined') {
    return new UndefinedElement();
  }
  //SPOW-2
  let firstOperand = element.operands[0];
  if (firstOperand.type === 'integer' && firstOperand.value === 0) {
    let secondOperand = element.operands[1];
    if (secondOperand.type === 'integer' && secondOperand.value > 0) {
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
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

function simplifyElement(element : IElement) : IElement {
  if(element.operands) {
    element.operands = element.operands.map(operand => simplifyElement(operand))
  }
  switch(element.type){
    case 'identifier':
    case 'integer':
    case 'undefined':
      return element;
    default:
      throw new Error('Not implemented')
  }
}

export function simplify(input : IElement | Expression) : IElement {
  if (input instanceof Expression) {
    return simplifyElement(input.ElementTree)
  } else {
    return simplifyElement(input)
  }
}
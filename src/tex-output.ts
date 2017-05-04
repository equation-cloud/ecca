import { IElement, OperatorElement, FunctionElement } from './elements'

export function convertElement(element : IElement, decorate : boolean) : string {
  if(element instanceof OperatorElement || element instanceof FunctionElement) {
    let texStrings : string[] = null;
    switch (element.type) {
      case 'equals': texStrings = ['', '=', '']; break;
      case 'sum': texStrings = ['', '+', '']; break;
      case 'subtraction': texStrings = ['', '-', '']; break;
      case 'product': texStrings = ['', '\\times ' ,'']; break;
      case 'division': texStrings = ['\\frac{', '}{', '}']; break;
      case 'power': texStrings = ['', '^{', '}']; break;
      case 'factorial': texStrings = ['', '', '!']; break;
      case 'negate': texStrings = ['-', '', '']; break;
      case 'brackets': texStrings = ['\\left(', '', '\\right)']; break;
      case 'function': texStrings = [(<FunctionElement>element).identifier + '\\left(', ',', '\\right)']; break;
      default: throw new Error('Unkown operator elemnt type "' + element.type + '"')
    }
    let outputString = texStrings[0];
    for (let i = 0; i < element.operands.length; i++) {
      outputString = outputString + convertElement(element.operands[i], decorate);
      if (i < element.operands.length - 1) {
        outputString = outputString + texStrings[1];
      }
    }
    outputString = outputString + texStrings[2];
    return outputString;
  } else {
    let applyId = element.id && decorate
    let returnValue = applyId ? '\\cssId{' + element.id + '}{' : ''
    switch (element.type) {
      case 'integer':
      case 'fractional':
        returnValue += element.value.toString()
        break;
      case 'identifier':
        returnValue += element.identifier
        break;
      default:
        throw new Error('Unknown element type "' + element.type + '"')
    }
    if (applyId) {
      returnValue += '}'
    }
    return returnValue
  }
}


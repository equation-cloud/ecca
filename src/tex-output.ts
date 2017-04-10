import { IElement, OperatorElement } from './elements'

function convertElement(element : IElement) : string {
  if(element instanceof OperatorElement) {
    let texStrings : string[] = null;
    switch (element.type) {
      case 'sum': texStrings = ['', '+', '']; break;
      case 'subtraction': texStrings = ['', '-', '']; break;
      case 'product': texStrings = ['', '\\times ' ,'']; break;
      case 'division': texStrings = ['\\frac{', '}{', '}']; break;
      case 'power': texStrings = ['', '^{', '}']; break;
      case 'brackets': texStrings = ['\\left(', '', '\\right)']; break;
      case 'equals': texStrings = ['', '=', '']; break;
    }
    let outputString = texStrings[0];
    for (let i = 0; i < element.operands.length; i++) {
      outputString = outputString + convertElement(element.operands[i]);
      if (i < element.operands.length - 1) {
        outputString = outputString + texStrings[1];
      }
    }
    outputString = outputString + texStrings[2];
    return outputString;
  } else {
    switch (element.type) {
      case 'integer':
      case 'fractional':
        return element.value.toString()
      case 'identifier':
        return element.identifier
      default:
        throw new Error('Unknown element type "' + element.type + '"')
    }
  }
}

export function generateRawTeXOutput(tree : IElement) : string {
  return convertElement(tree)
}
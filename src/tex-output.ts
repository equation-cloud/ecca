import { IElement } from './elements'

function convertElement(element : IElement) : string {
  switch(element.type){
    case 'integer':
      return element.value.toString()
    case 'fractional':
      return (element.numerator / element.denominator).toString()
    default:
      throw new Error('Unknown element type "' + element.type + '"')
  }
}

export function generateRawTeXOutput(tree : IElement) : string {
  return convertElement(tree)
}
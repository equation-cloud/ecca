import { Expression } from './expression'
import { IElement } from './elements'

function simplifyElement(element : IElement) : IElement{
  throw new Error('Not implemneted')
}

export function simplify(input : IElement | Expression) : IElement {
  if (input instanceof Expression) {
    return simplifyElement(input.ElementTree)
  } else {
    return simplifyElement(input)
  }
}
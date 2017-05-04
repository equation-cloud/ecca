import { IElement } from './elements'
import { convertElement } from './tex-output'
import { Expression } from './expression'

export { Expression }

export function generateRawTeX(input : Expression | IElement) : string {
  if (input instanceof Expression) {
    return convertElement(input.ElementTree)
  } else {
    return convertElement(input)
  }
}

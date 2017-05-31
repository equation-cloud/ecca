import { IElement } from './elements'
import { convertElement } from './tex-output'
import { 
  Expression,
  Variable
} from './expression'
import {
  ILexerError
} from './parser'

export { 
  Expression,
  Variable,
  ILexerError
}

export function generateRawTeX(input : Expression | IElement) : string {
  if (input instanceof Expression) {
    return convertElement(input.ElementTree)
  } else {
    return convertElement(input)
  }
}

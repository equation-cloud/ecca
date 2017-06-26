// All the imports to be exported to user

import { 
  Expression,
  Variable
} from './expression'
import {
  ILexerError,
  IParserError
} from './parser'
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
import { generateRawTeX, generateDecoratedTeX } from './tex-output'
import { simplify } from './simplification/simplify'

// expressions and classes requried for using them

export { 
  Expression,
  Variable,
  ILexerError,
  IParserError
}

// element types
export { 
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
}

// TeX output functions
export { generateRawTeX, generateDecoratedTeX }

// Simplification
export { simplify }

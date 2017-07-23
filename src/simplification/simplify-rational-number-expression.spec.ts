import { 
  simplifyRationalNumberExpression,
  simplifyRationalNumberExpressionRecursive
} from './simplify'
import {
  UndefinedElement,
  IntegerElement,
  PowerElement
} from './../elements'

describe('Simplify Rational Number Expression: Undefined', () => {
  it('will return an UndefinedElement, if passed an UndefinedElement', () => {
    let result = simplifyRationalNumberExpression(new UndefinedElement())
    expect(result.type).toBe('undefined')
  })
})

describe('Simplify Rational Number Expression: Other', () => {
  it('will return the result of simplifyRationalNubmerExpressionRecursive on the passed Element', () => {
    let element = new PowerElement([new IntegerElement('4'), new IntegerElement('2')])
    expect(simplifyRationalNumberExpression(element)).toBe(simplifyRationalNumberExpressionRecursive(element))
  })
})
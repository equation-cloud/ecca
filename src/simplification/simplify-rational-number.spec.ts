import { simplifyRationalNumber } from './simplify'
import {
  FractionalElement,
  IntegerElement
} from './../elements'

describe('Simplification: Integer', () => {
  it('Should pass through integer elements', () => {
    let simplified = simplifyRationalNumber(new IntegerElement('1'))
    expect(simplified.type).toBe('integer')
    expect(simplified.value).toBe(1)
  })
})

describe('Simplification: Fractional', () => {
  it(('The fraction cancels out then the returned value to be an integer of the correct value'), () => {
    let simplified = simplifyRationalNumber(new FractionalElement(4, 2))
    expect(simplified.type).toBe('integer')
    expect(simplified.value).toBe(2)
    simplified = simplifyRationalNumber(new FractionalElement(9566808, 4174))
    expect(simplified.type).toBe('integer')
    expect(simplified.value).toBe(2292)
  })
  it(('The fraction simplifies then the returned value to be the simplified fraction'), () => {
    let simplified = simplifyRationalNumber(new FractionalElement(7, 35))
    expect(simplified.type).toBe('fractional')
    expect(simplified.numerator).toBe(1)
    expect(simplified.denominator).toBe(5)
    simplified = simplifyRationalNumber(new FractionalElement(918, 1326))
    expect(simplified.type).toBe('fractional')
    expect(simplified.numerator).toBe(9)
    expect(simplified.denominator).toBe(13)
  })
})

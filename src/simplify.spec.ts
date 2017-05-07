import { Expression } from './expression'
import * as simplify from './simplify'
import { UndefinedElement, FractionalElement } from './elements'

describe('Simplification: Integer', () => {
  it('Should pass through integer elements', () => {
    let simplified = simplify.simplify(new Expression('1'))
    expect(simplified.type).toBe('integer')
    expect(simplified.value).toBe(1)
  })
})

describe('Simplification: Identifier', () => {
  it('Should pass through identifier elements', () => {
    let simplified = simplify.simplify(new Expression('x'))
    expect(simplified.type).toBe('identifier')
    expect(simplified.identifier).toBe('x')
  })
})

describe('Simplification: Undefined', () => {
  it('Should pass through identifier elements', () => {
    let simplified = simplify.simplify(new UndefinedElement())
    expect(simplified.type).toBe('undefined')
    expect(simplified.value).toBeNaN()
  })
})

describe('Simplification: Fractional', () => {
  it(('The fraction cancels out then the returned value to be an integer of the correct value'), () => {
    let simplified = simplify.simplify(new FractionalElement(4, 2))
    expect(simplified.type).toBe('integer')
    expect(simplified.value).toBe(2)
    simplified = simplify.simplify(new FractionalElement(9566808, 4174))
    expect(simplified.type).toBe('integer')
    expect(simplified.value).toBe(2292)
  })
  it(('The fraction simplifies then the returned value to be the simplified fraction'), () => {
    let simplified = simplify.simplify(new FractionalElement(7, 35))
    expect(simplified.type).toBe('fractional')
    expect(simplified.numerator).toBe(1)
    expect(simplified.denominator).toBe(5)
    simplified = simplify.simplify(new FractionalElement(918, 1326))
    expect(simplified.type).toBe('fractional')
    expect(simplified.numerator).toBe(9)
    expect(simplified.denominator).toBe(13)
  })
})

describe('Simplification: Power (SPOW-1)', () => {
  it('should return undefined if either operand is undefined', () => {
    expect(simplify.simplify(new Expression('1^null')).type).toBe('undefined')
    expect(simplify.simplify(new Expression('null^x')).type).toBe('undefined')
    expect(simplify.simplify(new Expression('null^null')).type).toBe('undefined')
  })
});

describe('Simplification: Power (SPOW-2)', () => {
  it('if the first operand is zero, and the second a positive integer, the result should be zero', () => {
    let expression = new Expression('0^1')
    expect(simplify.simplify(expression).type).toBe('integer')
    expect(simplify.simplify(expression).value).toBe(0)
  })
  it('if the first operand is zero, and the second a positive fraction, the result should be zero', () => {
    let expression = new Expression('0^0.45')
    expect(simplify.simplify(expression).type).toBe('integer')
    expect(simplify.simplify(expression).value).toBe(0)
  })
  it('if the first operand is zero, and the second zero, the result should be undefined', () => {
    expect(simplify.simplify(new Expression('0^0')).type).toBe('undefined')
  })
  it('if the first operand is zero, and the second a negative integer, the result should be undefined', () => {
    expect(simplify.simplify(new Expression('0^-5')).type).toBe('undefined')
  })
  it('if the first operand is zero, and the second a negative fraction, the result should be undefined', () => {
    expect(simplify.simplify(new Expression('0^-67.1')).type).toBe('undefined')
  })
  it('if the first operand is zero, and the second a variable, the result should be undefined', () => {
    expect(simplify.simplify(new Expression('0^x')).type).toBe('undefined')
  })
  it('if the first operand is zero, and the second brackets, the result should be undefined', () => {
    expect(simplify.simplify(new Expression('0^(x+2)')).type).toBe('undefined')
  })
})

describe('Simplification: Power (SPOW-3)', () => {
  it('should return one if the first operand is one', () => {
    let expression = new Expression('1^56')
    expect(simplify.simplify(expression).type).toBe('integer')
    expect(simplify.simplify(expression).value).toBe(1)
    expression = new Expression('1^0.0018')
    expect(simplify.simplify(expression).type).toBe('integer')
    expect(simplify.simplify(expression).value).toBe(1)
    expression = new Expression('1^x')
    expect(simplify.simplify(expression).type).toBe('integer')
    expect(simplify.simplify(expression).value).toBe(1)
    expression = new Expression('1^-1')
    expect(simplify.simplify(expression).type).toBe('integer')
    expect(simplify.simplify(expression).value).toBe(1)
    expression = new Expression('1^(x/y)')
    expect(simplify.simplify(expression).type).toBe('integer')
    expect(simplify.simplify(expression).value).toBe(1)
  })
});

describe('Simplification: Power (SPOW-3)', () => {
  it('should return one if the first operand is one', () => {
    let expression = new Expression('1^56')
    expect(simplify.simplify(expression).type).toBe('integer')
    expect(simplify.simplify(expression).value).toBe(1)
    expression = new Expression('1^0.0018')
    expect(simplify.simplify(expression).type).toBe('integer')
    expect(simplify.simplify(expression).value).toBe(1)
    expression = new Expression('1^x')
    expect(simplify.simplify(expression).type).toBe('integer')
    expect(simplify.simplify(expression).value).toBe(1)
    expression = new Expression('1^-1')
    expect(simplify.simplify(expression).type).toBe('integer')
    expect(simplify.simplify(expression).value).toBe(1)
    expression = new Expression('1^(x/y)')
    expect(simplify.simplify(expression).type).toBe('integer')
    expect(simplify.simplify(expression).value).toBe(1)
  })
});

describe('Simplification: Power (SPOW-4)', () => {
});

describe('Simplification: Power (SPOW-5)', () => {
  it('should return the original element if none of the above are true', () => {
    let expression = new Expression('y^x')
    expect(simplify.simplify(expression)).toBe(expression.ElementTree)
  })
});

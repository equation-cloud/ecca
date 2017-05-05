import { Expression } from './expression'
import { simplify } from './simplify'
import { UndefinedElement } from './elements'

describe('Simplification: Integer', () => {
  it('Should pass through integer elements', () => {
    let simplified = simplify(new Expression('1'))
    expect(simplified.type).toBe('integer')
    expect(simplified.value).toBe(1)
  })
})

describe('Simplification: Identifier', () => {
  it('Should pass through identifier elements', () => {
    let simplified = simplify(new Expression('x'))
    expect(simplified.type).toBe('identifier')
    expect(simplified.identifier).toBe('x')
  })
})

describe('Simplification: Undefined', () => {
  it('Should pass through identifier elements', () => {
    let simplified = simplify(new UndefinedElement())
    expect(simplified.type).toBe('undefined')
    expect(simplified.value).toBeNaN()
  })
})

describe('Simplification: Power (SPOW-1)', () => {
  it('should return undefined if either operand is undefined', () => {
    expect(simplify(new Expression('1^null')).type).toBe('undefined')
    expect(simplify(new Expression('null^x')).type).toBe('undefined')
    expect(simplify(new Expression('null^null')).type).toBe('undefined')
  })
});

describe('Simplification: Power (SPOW-2)', () => {
  it('if the first operand is zero, and the second a positive integer, the result should be zero', () => {
    let expression = new Expression('0^1')
    expect(simplify(expression).type).toBe('integer')
    expect(simplify(expression).value).toBe(0)
  })
  it('if the first operand is zero, and the second a positive fraction, the result should be zero', () => {
    let expression = new Expression('0^0.45')
    expect(simplify(expression).type).toBe('integer')
    expect(simplify(expression).value).toBe(0)
  })
  it('if the first operand is zero, and the second zero, the result should be undefined', () => {
    expect(simplify(new Expression('0^0')).type).toBe('undefined')
  })
  it('if the first operand is zero, and the second a negative integer, the result should be undefined', () => {
    expect(simplify(new Expression('0^-5')).type).toBe('undefined')
  })
  it('if the first operand is zero, and the second a negative fraction, the result should be undefined', () => {
    expect(simplify(new Expression('0^-67.1')).type).toBe('undefined')
  })
  it('if the first operand is zero, and the second a variable, the result should be undefined', () => {
    expect(simplify(new Expression('0^x')).type).toBe('undefined')
  })
  it('if the first operand is zero, and the second bracketes, the result should be undefined', () => {
    expect(simplify(new Expression('0^(x+2)')).type).toBe('undefined')
  })
})

describe('Simplification: Power (SPOW-3)', () => {
  it('should return one if the first operand is one', () => {
    let expression = new Expression('1^56')
    expect(simplify(expression).type).toBe('integer')
    expect(simplify(expression).value).toBe(1)
    expression = new Expression('1^0.0018')
    expect(simplify(expression).type).toBe('integer')
    expect(simplify(expression).value).toBe(1)
    expression = new Expression('1^x')
    expect(simplify(expression).type).toBe('integer')
    expect(simplify(expression).value).toBe(1)
    expression = new Expression('1^-1')
    expect(simplify(expression).type).toBe('integer')
    expect(simplify(expression).value).toBe(1)
    expression = new Expression('1^(x/y)')
    expect(simplify(expression).type).toBe('integer')
    expect(simplify(expression).value).toBe(1)
  })
});

describe('Simplification: Power (SPOW-3)', () => {
  it('should return one if the first operand is one', () => {
    let expression = new Expression('1^56')
    expect(simplify(expression).type).toBe('integer')
    expect(simplify(expression).value).toBe(1)
    expression = new Expression('1^0.0018')
    expect(simplify(expression).type).toBe('integer')
    expect(simplify(expression).value).toBe(1)
    expression = new Expression('1^x')
    expect(simplify(expression).type).toBe('integer')
    expect(simplify(expression).value).toBe(1)
    expression = new Expression('1^-1')
    expect(simplify(expression).type).toBe('integer')
    expect(simplify(expression).value).toBe(1)
    expression = new Expression('1^(x/y)')
    expect(simplify(expression).type).toBe('integer')
    expect(simplify(expression).value).toBe(1)
  })
});

describe('Simplification: Power (SPOW-4)', () => {
  it('should call simplifyIntegerPower if the second operand is an integer', () => {
    expect(null).toBe(1)
  })
});

describe('Simplification: Power (SPOW-5)', () => {
  it('should return the original element if none of the above are true', () => {
    let expression = new Expression('y^x')
    expect(simplify(expression)).toBe(expression.ElementTree)
  })
});

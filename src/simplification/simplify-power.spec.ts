import { simplifyPower } from './simplify'
import { Expression } from './../expression'
import { PowerElement } from './../elements'

// SPOW-1
describe('Simplification: Power (SPOW-1)', () => {
  it('should return undefined if either operand is undefined', () => {
    expect(simplifyPower(new Expression('1^null').ElementTree as PowerElement).type).toBe('undefined')
    expect(simplifyPower(new Expression('null^x').ElementTree as PowerElement).type).toBe('undefined')
    expect(simplifyPower(new Expression('null^null').ElementTree as PowerElement).type).toBe('undefined')
  })
});

// SPOW-2
describe('Simplification: Power (SPOW-2)', () => {
  it('if the first operand is zero, and the second a positive integer, the result should be zero', () => {
    let expression: PowerElement = new Expression('0^1').ElementTree as PowerElement
    expect(simplifyPower(expression).type).toBe('integer')
    expect(simplifyPower(expression).value).toBe(0)
  })
  it('if the first operand is zero, and the second a positive fraction, the result should be zero', () => {
    let expression: PowerElement = new Expression('0^0.45').ElementTree as PowerElement
    expect(simplifyPower(expression).type).toBe('integer')
    expect(simplifyPower(expression).value).toBe(0)
  })
  it('if the first operand is zero, and the second zero, the result should be undefined', () => {
    expect(simplifyPower(new Expression('0^0').ElementTree as PowerElement).type).toBe('undefined')
  })
  it('if the first operand is zero, and the second a negative integer, the result should be undefined', () => {
    expect(simplifyPower(new Expression('0^-5').ElementTree as PowerElement).type).toBe('undefined')
  })
  it('if the first operand is zero, and the second a negative fraction, the result should be undefined', () => {
    expect(simplifyPower(new Expression('0^-67.1').ElementTree as PowerElement).type).toBe('undefined')
  })
  it('if the first operand is zero, and the second a variable, the result should be undefined', () => {
    expect(simplifyPower(new Expression('0^x').ElementTree as PowerElement).type).toBe('undefined')
  })
  it('if the first operand is zero, and the second brackets, the result should be undefined', () => {
    expect(simplifyPower(new Expression('0^(x+2)').ElementTree as PowerElement).type).toBe('undefined')
  })
})

// SPOW-3
describe('Simplification: Power (SPOW-3)', () => {
  it('should return one if the first operand is one', () => {
    let expression: PowerElement = new Expression('1^56').ElementTree as PowerElement
    expect(simplifyPower(expression).type).toBe('integer')
    expect(simplifyPower(expression).value).toBe(1)
    expression = new Expression('1^0.0018').ElementTree as PowerElement
    expect(simplifyPower(expression).type).toBe('integer')
    expect(simplifyPower(expression).value).toBe(1)
    expression = new Expression('1^x').ElementTree as PowerElement
    expect(simplifyPower(expression).type).toBe('integer')
    expect(simplifyPower(expression).value).toBe(1)
    expression = new Expression('1^-1').ElementTree as PowerElement
    expect(simplifyPower(expression).type).toBe('integer')
    expect(simplifyPower(expression).value).toBe(1)
    expression = new Expression('1^(x/y)').ElementTree as PowerElement
    expect(simplifyPower(expression).type).toBe('integer')
    expect(simplifyPower(expression).value).toBe(1)
  })
});

// SPOW-4
describe('Simplification: Power (SPOW-4)', () => {
});

// SPOW-5
describe('Simplification: Power (SPOW-5)', () => {
  it('should return the original element if none of the above are true', () => {
    let expression = new Expression('x^y').ElementTree as PowerElement
    expect(simplifyPower(expression)).toBe(expression)
  })
});
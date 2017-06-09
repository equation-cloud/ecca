import { Expression } from './index'
import { NegateElement, OperatorElement } from './elements'
import { generateRawTeX } from './index'

describe('Expression : Raw TeX output', () => {
  it('will generate the correct TeX output for numbers', () => {
    expect(generateRawTeX(new Expression('0').ElementTree)).toBe('0')
    expect(generateRawTeX(new Expression('1').ElementTree)).toBe('1')
    expect(generateRawTeX(new Expression('.3').ElementTree)).toBe('0.3')
    expect(generateRawTeX(new Expression('3.2').ElementTree)).toBe('3.2')
    expect(generateRawTeX(new Expression('89.6665').ElementTree)).toBe('89.6665')
  })
  it('will generate the correct TeX output for sums', () => {
    expect(generateRawTeX(new Expression('1+1'))).toBe('1+1')
    expect(generateRawTeX(new Expression('1+1+2'))).toBe('1+1+2')
    expect(generateRawTeX(new Expression('1.2+.3'))).toBe('1.2+0.3')
  })
  it('will generate the correct TeX output for subtractions', () => {
    expect(generateRawTeX(new Expression('1-1'))).toBe('1-1')
    expect(generateRawTeX(new Expression('1+1-2'))).toBe('1+1-2')
    expect(generateRawTeX(new Expression('1.2-.3'))).toBe('1.2-0.3')
  })
  it('will generate the correct TeX output for products', () => {
    expect(generateRawTeX(new Expression('1*1').ElementTree)).toBe('1\\times 1')
    expect(generateRawTeX(new Expression('1*1*2').ElementTree)).toBe('1\\times 1\\times 2')
    expect(generateRawTeX(new Expression('1.2*.3').ElementTree)).toBe('1.2\\times 0.3')
  })
  it('will generate the correct TeX output for divisions', () => {
    expect(generateRawTeX(new Expression('1/1').ElementTree)).toBe('\\frac{1}{1}')
    expect(generateRawTeX(new Expression('1*1/2').ElementTree)).toBe('1\\times \\frac{1}{2}')
    expect(generateRawTeX(new Expression('1.2/.3').ElementTree)).toBe('\\frac{1.2}{0.3}')
  })
  it('will generate the correct TeX output for powers', () => {
    expect(generateRawTeX(new Expression('1^1').ElementTree)).toBe('1^{1}')
    expect(generateRawTeX(new Expression('1^(1^2)').ElementTree)).toBe('1^{\\left(1^{2}\\right)}')
    expect(generateRawTeX(new Expression('1.2^.3').ElementTree)).toBe('1.2^{0.3}')
  })
  it('will generate the correct TeX output for factorial', () => {
    expect(generateRawTeX(new Expression('1!'))).toBe('1!')
    expect(generateRawTeX(new Expression('0.56!'))).toBe('0.56!')
    expect(generateRawTeX(new Expression('x!'))).toBe('x!')
    expect(generateRawTeX(new Expression('1+x!'))).toBe('1+x!')
    expect(generateRawTeX(new Expression('x!*y!'))).toBe('x!\\times y!')
    expect(generateRawTeX(new Expression('(1-y)!'))).toBe('\\left(1-y\\right)!')
  })
  it('will generate the correct TeX output for equals', () => {
    expect(generateRawTeX(new Expression('1=1').ElementTree)).toBe('1=1')
    expect(generateRawTeX(new Expression('1*1=2*0.5').ElementTree)).toBe('1\\times 1=2\\times 0.5')
    expect(generateRawTeX(new Expression('1.2=.3*4').ElementTree)).toBe('1.2=0.3\\times 4')
  })
  it('will generate the correct TeX output for identifiers', () => {
    expect(generateRawTeX(new Expression('y').ElementTree)).toBe('y')
    expect(generateRawTeX(new Expression('y=x+1').ElementTree)).toBe('y=x+1')
    expect(generateRawTeX(new Expression('y=x*4').ElementTree)).toBe('y=x\\times 4')
  })
  it('will generate the correct TeX output for negation', () => {
    expect(generateRawTeX(new Expression('-y').ElementTree)).toBe('-y')
    expect(generateRawTeX(new Expression('y+-x').ElementTree)).toBe('y+-x')
    expect(generateRawTeX(new Expression('y=-(x*4)').ElementTree)).toBe('y=-\\left(x\\times 4\\right)')
  })
  it('will generate an error on an unknown element type', () => {
    expect(() => { generateRawTeX( {type: 'test'} ) } ).toThrowError()
  })
  it('will generate an error on an unknown operator element type', () => {
    let unknownOperator = new NegateElement( {type: 'integer', value: 0} );
    unknownOperator.type = 'test';
    expect(() => { generateRawTeX(unknownOperator) } ).toThrowError()
  })
})
import { Expression } from './index'
import { generateRawTeXOutput } from './tex-output'

describe('Expression : Raw TeX output', () => {
  it('will generate the correct TeX output for numbers', () => {
    expect(generateRawTeXOutput(new Expression('0').ElementTree)).toBe('0')
    expect(generateRawTeXOutput(new Expression('1').ElementTree)).toBe('1')
    expect(generateRawTeXOutput(new Expression('.3').ElementTree)).toBe('0.3')
    expect(generateRawTeXOutput(new Expression('3.2').ElementTree)).toBe('3.2')
    expect(generateRawTeXOutput(new Expression('89.6665').ElementTree)).toBe('89.6665')
  })
  it('will generate the correct TeX output for sums', () => {
    expect(generateRawTeXOutput(new Expression('1+1').ElementTree)).toBe('1+1')
    expect(generateRawTeXOutput(new Expression('1+1+2').ElementTree)).toBe('1+1+2')
    expect(generateRawTeXOutput(new Expression('1.2+.3').ElementTree)).toBe('1.2+0.3')
  })
  it('will generate the correct TeX output for subtractions', () => {
    expect(generateRawTeXOutput(new Expression('1-1').ElementTree)).toBe('1-1')
    expect(generateRawTeXOutput(new Expression('1+1-2').ElementTree)).toBe('1+1-2')
    expect(generateRawTeXOutput(new Expression('1.2-.3').ElementTree)).toBe('1.2-0.3')
  })
  it('will generate the correct TeX output for products', () => {
    expect(generateRawTeXOutput(new Expression('1*1').ElementTree)).toBe('1\\times 1')
    expect(generateRawTeXOutput(new Expression('1*1*2').ElementTree)).toBe('1\\times 1\\times 2')
    expect(generateRawTeXOutput(new Expression('1.2*.3').ElementTree)).toBe('1.2\\times 0.3')
  })
  it('will generate the correct TeX output for divisions', () => {
    expect(generateRawTeXOutput(new Expression('1/1').ElementTree)).toBe('\\frac{1}{1}')
    expect(generateRawTeXOutput(new Expression('1*1/2').ElementTree)).toBe('1\\times \\frac{1}{2}')
    expect(generateRawTeXOutput(new Expression('1.2/.3').ElementTree)).toBe('\\frac{1.2}{0.3}')
  })
  it('will generate the correct TeX output for powers', () => {
    expect(generateRawTeXOutput(new Expression('1^1').ElementTree)).toBe('1^{1}')
    expect(generateRawTeXOutput(new Expression('1^(1^2)').ElementTree)).toBe('1^{\\left(1^{2}\\right)}')
    expect(generateRawTeXOutput(new Expression('1.2^.3').ElementTree)).toBe('1.2^{0.3}')
  })
  it('will generate the correct TeX output for equals', () => {
    expect(generateRawTeXOutput(new Expression('1=1').ElementTree)).toBe('1=1')
    expect(generateRawTeXOutput(new Expression('1*1=2*0.5').ElementTree)).toBe('1\\times 1=2\\times 0.5')
    expect(generateRawTeXOutput(new Expression('1.2=.3*4').ElementTree)).toBe('1.2=0.3\\times 4')
  })
  it('will generate an error on an unknown element type', () => {
    expect(() => { generateRawTeXOutput( {type: 'test'} ) } ).toThrowError()
  })
  it('will generate the correct TeX output for identifiers', () => {
    expect(generateRawTeXOutput(new Expression('y').ElementTree)).toBe('y')
    expect(generateRawTeXOutput(new Expression('y=x+1').ElementTree)).toBe('y=x+1')
    expect(generateRawTeXOutput(new Expression('y=x*4').ElementTree)).toBe('y=x\\times 4')
  })
})
import { simplifyRationalNumberExpressionRecursive } from './simplify'
import { 
  UndefinedElement,
  IntegerElement,
  FractionalElement,
  SumElement,
  SubtractionElement,
  ProductElement,
  DivisionElement,
  PowerElement
} from './../elements'

describe('Simplification: simplifyRationalNumberExpressionRecursive', () => {
  it('should immediately return IntegerElements', () => {
    let integerElement = new IntegerElement('5')
    expect(simplifyRationalNumberExpressionRecursive(integerElement)).toBe(integerElement)
  })
  it('should return UndefinedElement for fractional elements with zero denominator', () => {
    expect(simplifyRationalNumberExpressionRecursive(new FractionalElement(6, 0)).type).toBe('undefined')
  })
  it('should return fractional elements with non-zero denominator unchanged', () => {
    let fractionalElement = new FractionalElement(5,6)
    expect(simplifyRationalNumberExpressionRecursive(fractionalElement)).toBe(fractionalElement)
  })
  it('should return elements with a single undefined operator as undefined', () => {
    let undefinedOperandElement = new SumElement([new UndefinedElement()])
    expect(simplifyRationalNumberExpressionRecursive(undefinedOperandElement).type).toBe('undefined')
  })
  it('should return the evaluated operand for sums with one operand', () => {
    let sumElement = new SumElement([new SumElement([new IntegerElement('3'), new IntegerElement('4')])])
    let result = simplifyRationalNumberExpressionRecursive(sumElement)
    expect(result.type).toBe('integer')
    expect(result.value).toBe(7)
  })
  it('should return the product of -1 and the evaluated operand for subtractions with one operand', () => {
    let subtrationElement = new SubtractionElement([new SumElement([new IntegerElement('3'), new IntegerElement('4')])])
    let result = simplifyRationalNumberExpressionRecursive(subtrationElement)
    expect(result.type).toBe('integer')
    expect(result.value).toBe(-7)
  })
  it('should return undefined if given two operands, at least one of which is undefined', () => {
    let undefinedElement = new UndefinedElement();
    let integerElement = new IntegerElement('7');
    let result = simplifyRationalNumberExpressionRecursive(new SumElement([integerElement, undefinedElement]))
    expect(result.type).toBe('undefined');
    result = simplifyRationalNumberExpressionRecursive(new SumElement([undefinedElement, integerElement]))
    expect(result.type).toBe('undefined');
  })
  it('should return an evaluated sum', () => {
    let sumElement = new SumElement([new IntegerElement('4'), new IntegerElement('8')])
    let result = simplifyRationalNumberExpressionRecursive(sumElement)
    expect(result.type).toBe('integer')
    expect(result.value).toBe(12)
  })
  it('should return an evaluated subtraction', () => {
    let subtractionElement = new SubtractionElement([new IntegerElement('8'), new IntegerElement('4')])
    let result = simplifyRationalNumberExpressionRecursive(subtractionElement)
    expect(result.type).toBe('integer')
    expect(result.value).toBe(4)
  })
  it('should return an evaluated product', () => {
    let productElement = new ProductElement([new IntegerElement('5'), new IntegerElement('4')])
    let result = simplifyRationalNumberExpressionRecursive(productElement)
    expect(result.type).toBe('integer')
    expect(result.value).toBe(15)
  })
  it('should return an evaluated division', () => {
    let divisionElement = new DivisionElement([new IntegerElement('20'), new IntegerElement('4')])
    let result = simplifyRationalNumberExpressionRecursive(divisionElement)
    expect(result.type).toBe('integer')
    expect(result.value).toBe(5)
  })
  it('should return an evaluated power opereator', () => {
    let powerElement = new PowerElement([new IntegerElement('8'), new IntegerElement('3')])
    let result = simplifyRationalNumberExpressionRecursive(powerElement)
    expect(result.type).toBe('integer')
    expect(result.value).toBe(512)
  })
})


import { Expression } from './../expression'
import {
  simplify,
  simplifyProductRecursive
} from './simplify'
import { 
  UndefinedElement,
  IntegerElement,
  FractionalElement,
  ProductElement
} from './../elements'


describe('Simplification: Identifier', () => {
  it('Should pass through identifier elements', () => {
    let simplified = simplify(new Expression('x'))
    expect(simplified.type).toBe('identifier')
    expect(simplified.identifier).toBe('x')
  })
})

describe('Simplification: Undefined', () => {
  it('Should pass through undefined elements', () => {
    let simplified = simplify(new UndefinedElement())
    expect(simplified.type).toBe('undefined')
    expect(simplified.value).toBeNaN()
  })
})

/*
describe('Simplification: Product (SPRD-1)', () => {
  it('should return undefined if any of the operands are undefined', () => {
    let expression = new Expression('1*4.23*x*null')
    expect(simplify.simplify(expression).type).toBe('undefined')
  })
});

describe('Simplification: Product (SPRD-2)', () => {
  it('should return zero if any of the operands are zero', () => {
    let expression = new Expression('1*4.23*x*0')
    expect(simplify.simplify(expression).type).toBe('integer')
    expect(simplify.simplify(expression).value).toBe(0)
  })
});

describe('Simplification: Product (SRPD-3)', () => {
  it('should return the operand if the product element only has one operand', () => {
    let expression = simplify.simplify(new ProductElement([new IntegerElement('82')]));
    expect(expression.type).toBe('integer');
    expect(expression.value).toBe(82);
  })
})

describe('Simplification: Product (SPRD-4)', () => {
  it('should return the single operand if SimplifyProductRecursive only returns one operand', () => {
    let expression = simplify.simplify(new Expression('2*3'));
    expect(expression.type).toBe('integer');
    expect(expression.value).toBe(6);
  })
  it('should return a product operator containing the returned operands from SimplifyProductRecursive if two or more operands are returned', () => {
    let expression = simplify.simplify(new Expression('2x'));
    expect(expression.type).toBe('product');
    expect(expression.operands.length).toBe(2);
    expect(expression.operands[0].type).toBe('integer');
    expect(expression.operands[0].value).toBe(2);
    expect(expression.operands[1].type).toBe('identifier');
    expect(expression.operands[1].identifier).toBe('x');
  })
  it('should return 1 if SimplifyProductRecursive returns no operands', () => {
    let expression = simplify.simplify(new Expression('1*1'));
    expect(expression.type).toBe('integer');
    expect(expression.value).toBe(1);
  })
})

describe('Simplification: Product (SPRDREC-1)', () => {
  it('should return an empty list from simplifyProductRecursive if there are two supplied constant operands whose product is 1', () => {
    expect(simplify.simplifyProductRecursive([new IntegerElement('2'), new FractionalElement(1, 2)]).length).toBe(0);
  })
  it('should return a single element list from simplifyProductRecursive if there are two supplied constant operands whose product is not 1', () => {
    let output = simplify.simplifyProductRecursive([new IntegerElement('5'), FractionalElement.CreateFromIntegerAndFractional('0', '3')]);
    expect(output.length).toBe(1);
    expect(output[0].type).toBe('fractional');
    expect(output[0].value).toBe(1.5);
  })
  it('should return the second operand only from simplifyProductRecursive if there are two supplied constant operands and the first is 1', () => {
    let notOne = FractionalElement.CreateFromIntegerAndFractional('0', '3');
    let output = simplify.simplifyProductRecursive([new IntegerElement('1'), notOne]);
    expect(output.length).toBe(1);
    expect(output[0]).toBe(notOne);
  })
  it('should return the first operand only from simplifyProductRecursive if there are two supplied constant operands and the second is 1', () => {
    let notOne = FractionalElement.CreateFromIntegerAndFractional('0', '3');
    let output = simplify.simplifyProductRecursive([notOne, new IntegerElement('1')]);
    expect(output.length).toBe(1);
    expect(output[0]).toBe(notOne);
  })
})*/
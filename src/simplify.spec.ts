import { Expression } from './expression'
import * as simplify from './simplify'
import { 
  UndefinedElement,
  IntegerElement,
  FractionalElement,
  ProductElement
} from './elements'

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
  it('Should pass through undefined elements', () => {
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
    //This is checked by asserting that the output is 1, which isn't fully testing SPRDREC-1.1 but does get around the nt testing provate functions issue
    let expression = simplify.simplify(new Expression('5*0.2'));
    expect(expression.type).toBe('integer');
    expect(expression.value).toBe(1);
  })
  it('should return a single element list from simplifyProductRecursive if there are two supplied constant operands whose product is not 1', () => {
    //This is checked by asserting that the output is 1, which isn't fully testing SPRDREC-1.1 but does get around the nt testing provate functions issue
    let expression = simplify.simplify(new Expression('5*0.3'));
    expect(expression.type).toBe('fractional');
    expect(expression.value).toBe(1.5);
  })
  it('should return the second operand only from simplifyProductRecursive if there are two supplied constant operands and the first is 1', () => {
    //This is checked by asserting that the output is 1, which isn't fully testing SPRDREC-1.1 but does get around the nt testing provate functions issue
    let expression = simplify.simplify(new Expression('1*0.3'));
    expect(expression.type).toBe('fractional');
    expect(expression.value).toBe(0.3);
  })
  it('should return the first operand only from simplifyProductRecursive if there are two supplied constant operands and the second is 1', () => {
    //This is checked by asserting that the output is 1, which isn't fully testing SPRDREC-1.1 but does get around the nt testing provate functions issue
    let expression = simplify.simplify(new Expression('5*1'));
    expect(expression.type).toBe('integer');
    expect(expression.value).toBe(5);
  })
})
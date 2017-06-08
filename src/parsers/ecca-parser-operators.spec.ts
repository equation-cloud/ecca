import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (operators)', () => {
  //Factorial
  it('will parse factorials to IElements of type "factorial"', () => {
    expect(new EccaParser().ParseString('1!').ElementTree.type).toBe('factorial');
    expect(new EccaParser().ParseString('0!').ElementTree.type).toBe('factorial');
    expect(new EccaParser().ParseString('3.665!').ElementTree.type).toBe('factorial');
    expect(new EccaParser().ParseString('x!').ElementTree.type).toBe('factorial');
    expect(new EccaParser().ParseString('(x+1)!').ElementTree.type).toBe('factorial');
  });
  it('will parse factorials to IElements with one operand', () => {
    expect(new EccaParser().ParseString('1!').ElementTree.operands.length).toBe(1);
  });
  it('will parse factorials to IElements with one operand of the correct type', () => {
    expect(new EccaParser().ParseString('1!').ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString('0!').ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString('3.665!').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('x!').ElementTree.operands[0].type).toBe('identifier');
    expect(new EccaParser().ParseString('(x+1)!').ElementTree.operands[0].type).toBe('brackets');
  });
  //Power
  it('will parse exponents to IElements of type "power"', () => {
    expect(new EccaParser().ParseString('1^2').ElementTree.type).toBe('power');
    expect(new EccaParser().ParseString('0^2123.2344').ElementTree.type).toBe('power');
    expect(new EccaParser().ParseString('0.3453^2.554').ElementTree.type).toBe('power');
    expect(new EccaParser().ParseString('.1121^.9759').ElementTree.type).toBe('power');
    expect(new EccaParser().ParseString('9649.23523^53825').ElementTree.type).toBe('power');
    expect(new EccaParser().ParseString('9649.23523^0').ElementTree.type).toBe('power');
  });
  it('will parse exponents to IElements with two operands', () => {
    expect(new EccaParser().ParseString('1^2').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('0^2123.2344').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('0.3453^2.554').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('.1121^.9759').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('9649.23523^53825').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('9649.23523^0').ElementTree.operands.length).toBe(2);
  });
  it('will parse exponents to IElements with the first operand having the correct type', () => {
    expect(new EccaParser().ParseString('1^2').ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString('0^2123.2344').ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString('0.3453^2.554').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('.1121^.9759').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523^53825').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523^0').ElementTree.operands[0].type).toBe('fractional');
  });
  it('will parse exponents to IElements with the second operand having the correct type', () => {
    expect(new EccaParser().ParseString('1^2').ElementTree.operands[1].type).toBe('integer');
    expect(new EccaParser().ParseString('0^2123.2344').ElementTree.operands[1].type).toBe('fractional');
    expect(new EccaParser().ParseString('0.3453^2.554').ElementTree.operands[1].type).toBe('fractional');
    expect(new EccaParser().ParseString('.1121^.9759').ElementTree.operands[1].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523^53825').ElementTree.operands[1].type).toBe('integer');
    expect(new EccaParser().ParseString('9649.23523^0').ElementTree.operands[1].type).toBe('integer');
  });//Division
  it('will parse division to IElements of type "division"', () => {
    expect(new EccaParser().ParseString('1/2').ElementTree.type).toBe('division');
    expect(new EccaParser().ParseString('0/2123.2344').ElementTree.type).toBe('division');
    expect(new EccaParser().ParseString('0.3453/2.554').ElementTree.type).toBe('division');
    expect(new EccaParser().ParseString('.1121/.9759').ElementTree.type).toBe('division');
    expect(new EccaParser().ParseString('9649.23523/53825').ElementTree.type).toBe('division');
    expect(new EccaParser().ParseString('9649.23523/0').ElementTree.type).toBe('division');
  });
  it('will parse division to IElements with two operands', () => {
    expect(new EccaParser().ParseString('1/2').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('0/2123.2344').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('0.3453/2.554').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('.1121/.9759').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('9649.23523/53825').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('9649.23523/0').ElementTree.operands.length).toBe(2);
  });
  it('will parse division to IElements with the first operand having the correct type', () => {
    expect(new EccaParser().ParseString('1/2').ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString('0/2123.2344').ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString('0.3453/2.554').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('.1121/.9759').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523/53825').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523/0').ElementTree.operands[0].type).toBe('fractional');
  });
  it('will parse division to IElements with the second operand having the correct type', () => {
    expect(new EccaParser().ParseString('1/2').ElementTree.operands[1].type).toBe('integer');
    expect(new EccaParser().ParseString('0/2123.2344').ElementTree.operands[1].type).toBe('fractional');
    expect(new EccaParser().ParseString('0.3453/2.554').ElementTree.operands[1].type).toBe('fractional');
    expect(new EccaParser().ParseString('.1121/.9759').ElementTree.operands[1].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523/53825').ElementTree.operands[1].type).toBe('integer');
    expect(new EccaParser().ParseString('9649.23523/0').ElementTree.operands[1].type).toBe('integer');
  });
  //Multiplication
  it('will parse multiplication to IElements of type "product"', () => {
    expect(new EccaParser().ParseString('1*2').ElementTree.type).toBe('product');
    expect(new EccaParser().ParseString('0*2123.2344').ElementTree.type).toBe('product');
    expect(new EccaParser().ParseString('0.3453*2.554').ElementTree.type).toBe('product');
    expect(new EccaParser().ParseString('.1121*.9759').ElementTree.type).toBe('product');
    expect(new EccaParser().ParseString('9649.23523*53825').ElementTree.type).toBe('product');
    expect(new EccaParser().ParseString('9649.23523*0').ElementTree.type).toBe('product');
  });
  it('will parse multiplication to IElements with the correct number of operands', () => {
    expect(new EccaParser().ParseString('1*2').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('0*2123.2344').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('0.3453*2.554').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('.1121*.9759*23').ElementTree.operands.length).toBe(3);
    expect(new EccaParser().ParseString('9649.23523*53825*.641437').ElementTree.operands.length).toBe(3);
    expect(new EccaParser().ParseString('9649.23523*0*45*1.0*0.777*3').ElementTree.operands.length).toBe(6);
  });
  it('will parse multiplication to IElements with the operands having the correct type', () => {
    expect(new EccaParser().ParseString('1*2').ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString('1*2').ElementTree.operands[1].type).toBe('integer');
    expect(new EccaParser().ParseString('9649.23523*0*45*1.0*0.777*3').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523*0*45*1.0*0.777*3').ElementTree.operands[1].type).toBe('integer');
    expect(new EccaParser().ParseString('9649.23523*0*45*1.0*0.777*3').ElementTree.operands[2].type).toBe('integer');
    expect(new EccaParser().ParseString('9649.23523*0*45*1.0*0.777*3').ElementTree.operands[3].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523*0*45*1.0*0.777*3').ElementTree.operands[4].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523*0*45*1.0*0.777*3').ElementTree.operands[5].type).toBe('integer');
  });  
  it('will parser implicit multiplication in the form of number-identifier correctly', () => {
    let exp = new EccaParser().ParseString('2x').ElementTree;
    expect(exp.type).toBe('product');
    expect(exp.operands.length).toBe(2);
    expect(exp.operands[0].type).toBe('integer');
    expect(exp.operands[0].value).toBe(2);
    expect(exp.operands[1].type).toBe('identifier');
    expect(exp.operands[1].identifier).toBe('x');
  })
  it('will parser implicit multiplication in the form of negate-number-identifier correctly', () => {
    let exp = new EccaParser().ParseString('-2x').ElementTree;
    expect(exp.type).toBe('negate');
    expect(exp.operands.length).toBe(1);
    expect(exp.operands[0].type).toBe('product');
    expect(exp.operands[0].operands.length).toBe(2);
    expect(exp.operands[0].operands[0].type).toBe('integer');
    expect(exp.operands[0].operands[0].value).toBe(2);
    expect(exp.operands[0].operands[1].type).toBe('identifier');
    expect(exp.operands[0].operands[1].identifier).toBe('x');
  })
  it('will parser implicit multiplication in the form of number-brackets correctly', () => {
    let exp = new EccaParser().ParseString('4.5(x+4)').ElementTree;
    expect(exp.type).toBe('product');
    expect(exp.operands.length).toBe(2);
    expect(exp.operands[0].type).toBe('fractional');
    expect(exp.operands[0].value).toBe(4.5);
    expect(exp.operands[1].type).toBe('brackets');
    expect(exp.operands[1].operands.length).toBe(1);
    expect(exp.operands[1].operands[0].type).toBe('sum');
  })
  //Addition
  it('will parse addition to IElements of type "sum"', () => {
    expect(new EccaParser().ParseString('1+2').ElementTree.type).toBe('sum');
    expect(new EccaParser().ParseString('0+2123.2344').ElementTree.type).toBe('sum');
    expect(new EccaParser().ParseString('0.3453+2.554').ElementTree.type).toBe('sum');
    expect(new EccaParser().ParseString('.1121+.9759').ElementTree.type).toBe('sum');
    expect(new EccaParser().ParseString('9649.23523+53825').ElementTree.type).toBe('sum');
    expect(new EccaParser().ParseString('9649.23523+0').ElementTree.type).toBe('sum');
  });
  it('will parse addition to IElements with the correct number of operands', () => {
    expect(new EccaParser().ParseString('1+2').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('0+2123.2344').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('0.3453+2.554').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('.1121+.9759+23').ElementTree.operands.length).toBe(3);
    expect(new EccaParser().ParseString('9649.23523+53825+.641437').ElementTree.operands.length).toBe(3);
    expect(new EccaParser().ParseString('9649.23523+0+45+1.0+0.777+3').ElementTree.operands.length).toBe(6);
  });
  it('will parse addition to IElements with the operands having the correct type', () => {
    expect(new EccaParser().ParseString('1+2').ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString('1+2').ElementTree.operands[1].type).toBe('integer');
    expect(new EccaParser().ParseString('9649.23523+0+45+1.0+0.777+3').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523+0+45+1.0+0.777+3').ElementTree.operands[1].type).toBe('integer');
    expect(new EccaParser().ParseString('9649.23523+0+45+1.0+0.777+3').ElementTree.operands[2].type).toBe('integer');
    expect(new EccaParser().ParseString('9649.23523+0+45+1.0+0.777+3').ElementTree.operands[3].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523+0+45+1.0+0.777+3').ElementTree.operands[4].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523+0+45+1.0+0.777+3').ElementTree.operands[5].type).toBe('integer');
  });
  //Subtraction
  it('will parse subtraction to IElements of type "subtraction"', () => {
    expect(new EccaParser().ParseString('1-2').ElementTree.type).toBe('subtraction');
    expect(new EccaParser().ParseString('0-2123.2344').ElementTree.type).toBe('subtraction');
    expect(new EccaParser().ParseString('0.3453-2.554').ElementTree.type).toBe('subtraction');
    expect(new EccaParser().ParseString('.1121-.9759').ElementTree.type).toBe('subtraction');
    expect(new EccaParser().ParseString('9649.23523-53825').ElementTree.type).toBe('subtraction');
    expect(new EccaParser().ParseString('9649.23523-0').ElementTree.type).toBe('subtraction');
  });
  it('will parse subtraction to IElements with two operands', () => {
    expect(new EccaParser().ParseString('1-2').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('0-2123.2344').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('0.3453-2.554').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('.1121-.9759').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('9649.23523-53825').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('9649.23523-0').ElementTree.operands.length).toBe(2);
  });
  it('will parse subtraction to IElements with the first operand having the correct type', () => {
    expect(new EccaParser().ParseString('1-2').ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString('0-2123.2344').ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString('0.3453-2.554').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('.1121-.9759').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523-53825').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523-0').ElementTree.operands[0].type).toBe('fractional');
  });
  it('will parse subtraction to IElements with the second operand having the correct type', () => {
    expect(new EccaParser().ParseString('1-2').ElementTree.operands[1].type).toBe('integer');
    expect(new EccaParser().ParseString('0-2123.2344').ElementTree.operands[1].type).toBe('fractional');
    expect(new EccaParser().ParseString('0.3453-2.554').ElementTree.operands[1].type).toBe('fractional');
    expect(new EccaParser().ParseString('.1121-.9759').ElementTree.operands[1].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523-53825').ElementTree.operands[1].type).toBe('integer');
    expect(new EccaParser().ParseString('9649.23523-0').ElementTree.operands[1].type).toBe('integer');
  });
  //Equals
  it('will parse equals to IElements of type "equals"', () => {
    expect(new EccaParser().ParseString('1=1').ElementTree.type).toBe('equals');
    expect(new EccaParser().ParseString('0=0').ElementTree.type).toBe('equals');
    expect(new EccaParser().ParseString('0.3453=0.3453').ElementTree.type).toBe('equals');
    expect(new EccaParser().ParseString('.1121=.1121').ElementTree.type).toBe('equals');
    expect(new EccaParser().ParseString('9649.23523=9649.23523').ElementTree.type).toBe('equals');
  });
  it('will parse subtraction to IElements with two operands', () => {
    expect(new EccaParser().ParseString('1=1').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('0=0').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('0.3453=0.3453').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('.1121=.1121').ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString('9649.23523=9649.23523').ElementTree.operands.length).toBe(2);
  });
  it('will parse subtraction to IElements with the first operand having the correct type', () => {
    expect(new EccaParser().ParseString('1=1').ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString('0=0').ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString('0.3453=0.3453').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('.1121=.1121').ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523=9649.23523').ElementTree.operands[0].type).toBe('fractional');
  });
  it('will parse subtraction to IElements with the second operand having the correct type', () => {
    expect(new EccaParser().ParseString('1=1').ElementTree.operands[1].type).toBe('integer');
    expect(new EccaParser().ParseString('0=0').ElementTree.operands[1].type).toBe('integer');
    expect(new EccaParser().ParseString('0.3453=0.3453').ElementTree.operands[1].type).toBe('fractional');
    expect(new EccaParser().ParseString('.1121=.1121').ElementTree.operands[1].type).toBe('fractional');
    expect(new EccaParser().ParseString('9649.23523=9649.23523').ElementTree.operands[1].type).toBe('fractional');
  });
});
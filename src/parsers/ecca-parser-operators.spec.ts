import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (operators)', () => {
  //Division
  it('will parse division to IElements of type "division"', () => {
    expect(ecca.Parser.ParseString('1/2').type).toBe('division');
    expect(ecca.Parser.ParseString('0/2123.2344').type).toBe('division');
    expect(ecca.Parser.ParseString('0.3453/2.554').type).toBe('division');
    expect(ecca.Parser.ParseString('.1121/.9759').type).toBe('division');
    expect(ecca.Parser.ParseString('9649.23523/53825').type).toBe('division');
    expect(ecca.Parser.ParseString('9649.23523/0').type).toBe('division');
  });
  it('will parse division to IElements with two operands', () => {
    expect(ecca.Parser.ParseString('1/2').operands.length).toBe(2);
    expect(ecca.Parser.ParseString('0/2123.2344').operands.length).toBe(2);
    expect(ecca.Parser.ParseString('0.3453/2.554').operands.length).toBe(2);
    expect(ecca.Parser.ParseString('.1121/.9759').operands.length).toBe(2);
    expect(ecca.Parser.ParseString('9649.23523/53825').operands.length).toBe(2);
    expect(ecca.Parser.ParseString('9649.23523/0').operands.length).toBe(2);
  });
  it('will parse division to IElements with the first operand having the correct type', () => {
    expect(ecca.Parser.ParseString('1/2').operands[0].type).toBe('integer');
    expect(ecca.Parser.ParseString('0/2123.2344').operands[0].type).toBe('integer');
    expect(ecca.Parser.ParseString('0.3453/2.554').operands[0].type).toBe('fractional');
    expect(ecca.Parser.ParseString('.1121/.9759').operands[0].type).toBe('fractional');
    expect(ecca.Parser.ParseString('9649.23523/53825').operands[0].type).toBe('fractional');
    expect(ecca.Parser.ParseString('9649.23523/0').operands[0].type).toBe('fractional');
  });
  it('will parse division to IElements with the second operand having the correct type', () => {
    expect(ecca.Parser.ParseString('1/2').operands[1].type).toBe('integer');
    expect(ecca.Parser.ParseString('0/2123.2344').operands[1].type).toBe('fractional');
    expect(ecca.Parser.ParseString('0.3453/2.554').operands[1].type).toBe('fractional');
    expect(ecca.Parser.ParseString('.1121/.9759').operands[1].type).toBe('fractional');
    expect(ecca.Parser.ParseString('9649.23523/53825').operands[1].type).toBe('integer');
    expect(ecca.Parser.ParseString('9649.23523/0').operands[1].type).toBe('integer');
  });
  //Multiplication
  it('will parse multiplication to IElements of type "product"', () => {
    expect(ecca.Parser.ParseString('1*2').type).toBe('product');
    expect(ecca.Parser.ParseString('0*2123.2344').type).toBe('product');
    expect(ecca.Parser.ParseString('0.3453*2.554').type).toBe('product');
    expect(ecca.Parser.ParseString('.1121*.9759').type).toBe('product');
    expect(ecca.Parser.ParseString('9649.23523*53825').type).toBe('product');
    expect(ecca.Parser.ParseString('9649.23523*0').type).toBe('product');
  });
  it('will parse multiplication to IElements with the correct number of operands', () => {
    expect(ecca.Parser.ParseString('1*2').operands.length).toBe(2);
    expect(ecca.Parser.ParseString('0*2123.2344').operands.length).toBe(2);
    expect(ecca.Parser.ParseString('0.3453*2.554').operands.length).toBe(2);
    expect(ecca.Parser.ParseString('.1121*.9759*23').operands.length).toBe(3);
    expect(ecca.Parser.ParseString('9649.23523*53825*.641437').operands.length).toBe(3);
    expect(ecca.Parser.ParseString('9649.23523*0*45*1.0*0.777*3').operands.length).toBe(6);
  });
  it('will parse multiplication to IElements with the operands having the correct type', () => {
    expect(ecca.Parser.ParseString('1*2').operands[0].type).toBe('integer');
    expect(ecca.Parser.ParseString('1*2').operands[1].type).toBe('integer');
    expect(ecca.Parser.ParseString('9649.23523*0*45*1.0*0.777*3').operands[0].type).toBe('fractional');
    expect(ecca.Parser.ParseString('9649.23523*0*45*1.0*0.777*3').operands[1].type).toBe('integer');
    expect(ecca.Parser.ParseString('9649.23523*0*45*1.0*0.777*3').operands[2].type).toBe('integer');
    expect(ecca.Parser.ParseString('9649.23523*0*45*1.0*0.777*3').operands[3].type).toBe('fractional');
    expect(ecca.Parser.ParseString('9649.23523*0*45*1.0*0.777*3').operands[4].type).toBe('fractional');
    expect(ecca.Parser.ParseString('9649.23523*0*45*1.0*0.777*3').operands[5].type).toBe('integer');
  });  
  //Addition
  it('will parse addition to IElements of type "sum"', () => {
    expect(ecca.Parser.ParseString('1+2').type).toBe('product');
    expect(ecca.Parser.ParseString('0+2123.2344').type).toBe('product');
    expect(ecca.Parser.ParseString('0.3453+2.554').type).toBe('product');
    expect(ecca.Parser.ParseString('.1121+.9759').type).toBe('product');
    expect(ecca.Parser.ParseString('9649.23523+53825').type).toBe('product');
    expect(ecca.Parser.ParseString('9649.23523+0').type).toBe('product');
  });
  it('will parse addition to IElements with the correct number of operands', () => {
    expect(ecca.Parser.ParseString('1+2').operands.length).toBe(2);
    expect(ecca.Parser.ParseString('0+2123.2344').operands.length).toBe(2);
    expect(ecca.Parser.ParseString('0.3453+2.554').operands.length).toBe(2);
    expect(ecca.Parser.ParseString('.1121+.9759+23').operands.length).toBe(3);
    expect(ecca.Parser.ParseString('9649.23523+53825+.641437').operands.length).toBe(3);
    expect(ecca.Parser.ParseString('9649.23523+0+45+1.0+0.777+3').operands.length).toBe(6);
  });
  it('will parse addition to IElements with the operands having the correct type', () => {
    expect(ecca.Parser.ParseString('1+2').operands[0].type).toBe('integer');
    expect(ecca.Parser.ParseString('1+2').operands[1].type).toBe('integer');
    expect(ecca.Parser.ParseString('9649.23523+0+45+1.0+0.777+3').operands[0].type).toBe('fractional');
    expect(ecca.Parser.ParseString('9649.23523+0+45+1.0+0.777+3').operands[1].type).toBe('integer');
    expect(ecca.Parser.ParseString('9649.23523+0+45+1.0+0.777+3').operands[2].type).toBe('integer');
    expect(ecca.Parser.ParseString('9649.23523+0+45+1.0+0.777+3').operands[3].type).toBe('fractional');
    expect(ecca.Parser.ParseString('9649.23523+0+45+1.0+0.777+3').operands[4].type).toBe('fractional');
    expect(ecca.Parser.ParseString('9649.23523+0+45+1.0+0.777+3').operands[5].type).toBe('integer');
  });  
});
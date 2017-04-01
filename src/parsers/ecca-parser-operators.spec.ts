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
});
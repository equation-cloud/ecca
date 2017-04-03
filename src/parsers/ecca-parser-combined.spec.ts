import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (combined)', () => {
  it('will parse "5.35=1+.3*4.5+3" correctly', () => {
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").type).toBe('equals');
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands.length).toBe(2);
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[0].type).toBe('fractional');
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[0].numerator).toBe(535);
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[0].denominator).toBe(100);
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].type).toBe('sum');
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].operands.length).toBe(3);
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].operands[0].type).toBe('integer');
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].operands[0].value).toBe(1);
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].operands[1].type).toBe('product');
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].operands[1].operands.length).toBe(2);
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].operands[1].operands[0].type).toBe('fractional');
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].operands[1].operands[0].numerator).toBe(3);
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].operands[1].operands[0].denominator).toBe(10);
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].operands[1].operands[1].type).toBe('fractional');
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].operands[1].operands[1].numerator).toBe(45);
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].operands[1].operands[1].denominator).toBe(10);
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].operands[2].type).toBe('integer');
    expect(ecca.Parser.ParseString("5.35=1+.3*4.5+3").operands[1].operands[2].value).toBe(3);
  });
  it('will parse "1+5^3*-2=756/3.0" correctly', () => {
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").type).toBe('equals');
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands.length).toBe(2);
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].type).toBe('sum');
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands.length).toBe(2);
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[0].type).toBe('integer');
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[0].value).toBe(1);
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[1].type).toBe('product');
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[1].operands.length).toBe(2);
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[1].operands[0].type).toBe('power');
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[1].operands[0].operands.length).toBe(2);
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[1].operands[0].operands[0].type).toBe('integer');
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[1].operands[0].operands[0].value).toBe(5);
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[1].operands[0].operands[1].type).toBe('integer');
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[1].operands[0].operands[1].value).toBe(3);
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[1].operands[1].type).toBe('negate');
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[1].operands[1].operands.length).toBe(1);
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[1].operands[1].operands[0].type).toBe('integer');
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[0].operands[1].operands[1].operands[0].value).toBe(2);
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[1].type).toBe('division');
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[1].operands.length).toBe(2);
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[1].operands[0].type).toBe('integer');
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[1].operands[0].value).toBe(756);
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[1].operands[1].type).toBe('fractional');
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[1].operands[1].numerator).toBe(30);
    expect(ecca.Parser.ParseString("1+5^3*-2=756/3.0").operands[1].operands[1].denominator).toBe(10);
  });
});
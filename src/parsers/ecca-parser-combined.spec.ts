import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (combined)', () => {
  it('will parse "5.35=1+.3*4.5+3" correctly', () => {
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.type).toBe('equals');
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[0].numerator).toBe(535);
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[0].denominator).toBe(100);
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].type).toBe('sum');
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].operands.length).toBe(3);
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].operands[0].value).toBe(1);
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].operands[1].type).toBe('product');
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].operands[1].operands.length).toBe(2);
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].operands[1].operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].operands[1].operands[0].numerator).toBe(3);
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].operands[1].operands[0].denominator).toBe(10);
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].operands[1].operands[1].type).toBe('fractional');
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].operands[1].operands[1].numerator).toBe(45);
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].operands[1].operands[1].denominator).toBe(10);
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].operands[2].type).toBe('integer');
    expect(new EccaParser().ParseString("5.35=1+.3*4.5+3").ElementTree.operands[1].operands[2].value).toBe(3);
  });
  it('will parse "1+5^3*-2=756/3.0" correctly', () => {
    let output = new EccaParser().ParseString("1+5^3*-2=756/3.0");
    expect(output.ElementTree.type).toBe('equals');
    expect(output.ElementTree.operands.length).toBe(2);
    expect(output.ElementTree.operands[0].type).toBe('sum');
    expect(output.ElementTree.operands[0].operands.length).toBe(2);
    expect(output.ElementTree.operands[0].operands[0].type).toBe('integer');
    expect(output.ElementTree.operands[0].operands[0].value).toBe(1);
    expect(output.ElementTree.operands[0].operands[1].type).toBe('product');
    expect(output.ElementTree.operands[0].operands[1].operands.length).toBe(2);
    expect(output.ElementTree.operands[0].operands[1].operands[0].type).toBe('power');
    expect(output.ElementTree.operands[0].operands[1].operands[0].operands.length).toBe(2);
    expect(output.ElementTree.operands[0].operands[1].operands[0].operands[0].type).toBe('integer');
    expect(output.ElementTree.operands[0].operands[1].operands[0].operands[0].value).toBe(5);
    expect(output.ElementTree.operands[0].operands[1].operands[0].operands[1].type).toBe('integer');
    expect(output.ElementTree.operands[0].operands[1].operands[0].operands[1].value).toBe(3);
    expect(output.ElementTree.operands[0].operands[1].operands[1].type).toBe('negate');
    expect(output.ElementTree.operands[0].operands[1].operands[1].operands.length).toBe(1);
    expect(output.ElementTree.operands[0].operands[1].operands[1].operands[0].type).toBe('integer');
    expect(output.ElementTree.operands[0].operands[1].operands[1].operands[0].value).toBe(2);
    expect(output.ElementTree.operands[1].type).toBe('division');
    expect(output.ElementTree.operands[1].operands.length).toBe(2);
    expect(output.ElementTree.operands[1].operands[0].type).toBe('integer');
    expect(output.ElementTree.operands[1].operands[0].value).toBe(756);
    expect(output.ElementTree.operands[1].operands[1].type).toBe('fractional');
    expect(output.ElementTree.operands[1].operands[1].numerator).toBe(30);
    expect(output.ElementTree.operands[1].operands[1].denominator).toBe(10);
  });
  it('will parser "1^(2^3)" correctly', () => {
    let output = new EccaParser().ParseString("1^(2^3)");
    expect(output.ElementTree.type).toBe('power');
    expect(output.ElementTree.operands.length).toBe(2)
    expect(output.ElementTree.operands[0].type).toBe('integer');
    expect(output.ElementTree.operands[0].value).toBe(1)
    expect(output.ElementTree.operands[1].type).toBe('brackets');
    expect(output.ElementTree.operands[1].operands.length).toBe(1);
    expect(output.ElementTree.operands[1].operands[0].type).toBe('power');
    expect(output.ElementTree.operands[1].operands[0].operands.length).toBe(2);
    expect(output.ElementTree.operands[1].operands[0].operands[0].type).toBe('integer');
    expect(output.ElementTree.operands[1].operands[0].operands[0].value).toBe(2);
    expect(output.ElementTree.operands[1].operands[0].operands[1].type).toBe('integer');
    expect(output.ElementTree.operands[1].operands[0].operands[1].value).toBe(3);
  });
});
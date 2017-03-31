import { EccaParser } from './ecca-parser'

describe('EccaParser: ParseString', () => {
  let eccaParser = new EccaParser();
  it('will parse single integer strings to IElements of type "integer"', () => {
    expect(eccaParser.ParseString('0').type).toBe('integer');
    expect(eccaParser.ParseString('1').type).toBe('integer');
    expect(eccaParser.ParseString('23').type).toBe('integer');
  });
  it('will parse single integer strings to IElements with correct numeric value', () => {
    expect(eccaParser.ParseString('0').value).toBe(0);
    expect(eccaParser.ParseString('1').value).toBe(1);
    expect(eccaParser.ParseString('23').value).toBe(23);
  });
  it('will parse decimal strings to IElements of type "fractional"', () => {
    expect(eccaParser.ParseString('0.0').type).toBe('fractional');
    expect(eccaParser.ParseString('0.4').type).toBe('fractional');
    expect(eccaParser.ParseString('1.3').type).toBe('fractional');
  });
  it('will parse decimal strings to IElements with correct numerators', () => {
    expect(eccaParser.ParseString('0.0').numerator).toBe(0);
    expect(eccaParser.ParseString('0.4').numerator).toBe(4);
    expect(eccaParser.ParseString('1.3').numerator).toBe(13);
    expect(eccaParser.ParseString('345.3998').numerator).toBe(3453998);
    expect(eccaParser.ParseString('100000.0001').numerator).toBe(1000000001);
    expect(eccaParser.ParseString('3.1415926').numerator).toBe(31415926);
    expect(eccaParser.ParseString('.97').numerator).toBe(97);
    expect(eccaParser.ParseString('.00012345').numerator).toBe(12345);
  });
  it('will parse decimal strings to IElements with correct denominators', () => {
    expect(eccaParser.ParseString('0.0').denominator).toBe(10);
    expect(eccaParser.ParseString('0.4').denominator).toBe(10);
    expect(eccaParser.ParseString('1.3').denominator).toBe(10);
    expect(eccaParser.ParseString('345.3998').denominator).toBe(10000);
    expect(eccaParser.ParseString('100000.0001').denominator).toBe(10000);
    expect(eccaParser.ParseString('3.1415926').denominator).toBe(10000000);
    expect(eccaParser.ParseString('.97').denominator).toBe(100);
    expect(eccaParser.ParseString('.00012345').denominator).toBe(100000000);
  });
});
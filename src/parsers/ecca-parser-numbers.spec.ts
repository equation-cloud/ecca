import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (numbers)', () => {
  //Integers
  it('will parse single integer strings to IElements of type "integer"', () => {
    expect(new EccaParser().ParseString('0').type).toBe('integer');
    expect(new EccaParser().ParseString('1').type).toBe('integer');
    expect(new EccaParser().ParseString('23').type).toBe('integer');
  });
  it('will parse single integer strings to IElements with correct numeric value', () => {
    expect(new EccaParser().ParseString('0').value).toBe(0);
    expect(new EccaParser().ParseString('1').value).toBe(1);
    expect(new EccaParser().ParseString('23').value).toBe(23);
  });
  //Decimals
  it('will parse decimal strings to IElements of type "fractional"', () => {
    expect(new EccaParser().ParseString('0.0').type).toBe('fractional');
    expect(new EccaParser().ParseString('0.4').type).toBe('fractional');
    expect(new EccaParser().ParseString('1.3').type).toBe('fractional');
  });
  it('will parse decimal strings to IElements with correct numerators', () => {
    expect(new EccaParser().ParseString('0.0').numerator).toBe(0);
    expect(new EccaParser().ParseString('0.4').numerator).toBe(4);
    expect(new EccaParser().ParseString('1.3').numerator).toBe(13);
    expect(new EccaParser().ParseString('345.3998').numerator).toBe(3453998);
    expect(new EccaParser().ParseString('100000.0001').numerator).toBe(1000000001);
    expect(new EccaParser().ParseString('3.1415926').numerator).toBe(31415926);
    expect(new EccaParser().ParseString('.97').numerator).toBe(97);
    expect(new EccaParser().ParseString('.00012345').numerator).toBe(12345);
  });
  it('will parse decimal strings to IElements with correct denominators', () => {
    expect(new EccaParser().ParseString('0.0').denominator).toBe(10);
    expect(new EccaParser().ParseString('0.4').denominator).toBe(10);
    expect(new EccaParser().ParseString('1.3').denominator).toBe(10);
    expect(new EccaParser().ParseString('345.3998').denominator).toBe(10000);
    expect(new EccaParser().ParseString('100000.0001').denominator).toBe(10000);
    expect(new EccaParser().ParseString('3.1415926').denominator).toBe(10000000);
    expect(new EccaParser().ParseString('.97').denominator).toBe(100);
    expect(new EccaParser().ParseString('.00012345').denominator).toBe(100000000);
  });
});
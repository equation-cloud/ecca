import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (numbers)', () => {
  //Integers
  it('will parse single integer strings to IElements of type "integer"', () => {
    expect(new EccaParser().ParseString('0').ElementTree.type).toBe('integer');
    expect(new EccaParser().ParseString('1').ElementTree.type).toBe('integer');
    expect(new EccaParser().ParseString('23').ElementTree.type).toBe('integer');
  });
  it('will parse single integer strings to IElements with correct numeric value', () => {
    expect(new EccaParser().ParseString('0').ElementTree.value).toBe(0);
    expect(new EccaParser().ParseString('1').ElementTree.value).toBe(1);
    expect(new EccaParser().ParseString('23').ElementTree.value).toBe(23);
  });
  //Decimals
  it('will parse decimal strings to IElements of type "fractional"', () => {
    expect(new EccaParser().ParseString('0.0').ElementTree.type).toBe('fractional');
    expect(new EccaParser().ParseString('0.4').ElementTree.type).toBe('fractional');
    expect(new EccaParser().ParseString('1.3').ElementTree.type).toBe('fractional');
  });
  it('will parse decimal strings to IElements with correct numerators', () => {
    expect(new EccaParser().ParseString('0.0').ElementTree.numerator).toBe(0);
    expect(new EccaParser().ParseString('0.4').ElementTree.numerator).toBe(4);
    expect(new EccaParser().ParseString('1.3').ElementTree.numerator).toBe(13);
    expect(new EccaParser().ParseString('345.3998').ElementTree.numerator).toBe(3453998);
    expect(new EccaParser().ParseString('100000.0001').ElementTree.numerator).toBe(1000000001);
    expect(new EccaParser().ParseString('3.1415926').ElementTree.numerator).toBe(31415926);
    expect(new EccaParser().ParseString('.97').ElementTree.numerator).toBe(97);
    expect(new EccaParser().ParseString('.00012345').ElementTree.numerator).toBe(12345);
  });
  it('will parse decimal strings to IElements with correct denominators', () => {
    expect(new EccaParser().ParseString('0.0').ElementTree.denominator).toBe(10);
    expect(new EccaParser().ParseString('0.4').ElementTree.denominator).toBe(10);
    expect(new EccaParser().ParseString('1.3').ElementTree.denominator).toBe(10);
    expect(new EccaParser().ParseString('345.3998').ElementTree.denominator).toBe(10000);
    expect(new EccaParser().ParseString('100000.0001').ElementTree.denominator).toBe(10000);
    expect(new EccaParser().ParseString('3.1415926').ElementTree.denominator).toBe(10000000);
    expect(new EccaParser().ParseString('.97').ElementTree.denominator).toBe(100);
    expect(new EccaParser().ParseString('.00012345').ElementTree.denominator).toBe(100000000);
  });
});
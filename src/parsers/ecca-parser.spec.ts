import { EccaParser } from './ecca-parser'

describe('EccaParser: ParseString', () => {
  it('will parse single integer strings to IElements of type "integer"', () => {
    let eccaParser = new EccaParser();
    expect(eccaParser.ParseString('0').type).toBe('integer');
    expect(eccaParser.ParseString('1').type).toBe('integer');
    expect(eccaParser.ParseString('23').type).toBe('integer');
  });
  it('will parse single integer strings to IElements with correct numeric value', () => {
    let eccaParser = new EccaParser();
    expect(eccaParser.ParseString('0').value).toBe(0);
    expect(eccaParser.ParseString('1').value).toBe(1);
    expect(eccaParser.ParseString('23').value).toBe(23);
  });
});
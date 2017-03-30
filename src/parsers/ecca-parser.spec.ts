import { EccaParser } from './ecca-parser'

describe('EccaParser: ParseString', () => {
  it('will parse numbers', () => {
    let eccaParser = new EccaParser();
    expect(eccaParser.ParseString('0')).toBe('0');
    expect(eccaParser.ParseString('1')).toBe('1');
    expect(eccaParser.ParseString('23')).toBe('23');
  });
});
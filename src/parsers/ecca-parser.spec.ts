import { EccaParser } from './ecca-parser'

describe('EccaParser: ParseString', () => {
  it('will parse numbers', () => {
    let eccaParser = new EccaParser();
    expect(eccaParser.ParseString('23').tokens[0].image).toBe('23');
  });
});
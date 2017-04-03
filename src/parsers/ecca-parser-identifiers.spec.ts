import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (identifiers)', () => {
  it('will parse identifiers (constants or variables) to IElements of type "identifiers"', () => {
    expect(ecca.Parser.ParseString("x").type).toBe('identifier');
    expect(ecca.Parser.ParseString("up").type).toBe('identifier');
    expect(ecca.Parser.ParseString("y").type).toBe('identifier');
    expect(ecca.Parser.ParseString("Tf").type).toBe('identifier');
    expect(ecca.Parser.ParseString("UP").type).toBe('identifier');
    expect(ecca.Parser.ParseString("D").type).toBe('identifier');
  });
  it('will parse identifiers (constants or variables) to IElements of with the correct identifier', () => {
    expect(ecca.Parser.ParseString("x").identifier).toBe('x');
    expect(ecca.Parser.ParseString("up").identifier).toBe('up');
    expect(ecca.Parser.ParseString("y").identifier).toBe('y');
    expect(ecca.Parser.ParseString("Tf").identifier).toBe('Tf');
    expect(ecca.Parser.ParseString("UP").identifier).toBe('UP');
    expect(ecca.Parser.ParseString("D").identifier).toBe('D');
  });
});
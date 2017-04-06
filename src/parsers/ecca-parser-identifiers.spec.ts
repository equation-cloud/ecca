import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (identifiers)', () => {
  it('will parse identifiers (constants or variables) to IElements of type "identifiers"', () => {
    expect(new EccaParser().ParseString("x").type).toBe('identifier');
    expect(new EccaParser().ParseString("up").type).toBe('identifier');
    expect(new EccaParser().ParseString("y").type).toBe('identifier');
    expect(new EccaParser().ParseString("Tf").type).toBe('identifier');
    expect(new EccaParser().ParseString("UP").type).toBe('identifier');
    expect(new EccaParser().ParseString("D").type).toBe('identifier');
  });
  it('will parse identifiers (constants or variables) to IElements of with the correct identifier', () => {
    expect(new EccaParser().ParseString("x").identifier).toBe('x');
    expect(new EccaParser().ParseString("up").identifier).toBe('up');
    expect(new EccaParser().ParseString("y").identifier).toBe('y');
    expect(new EccaParser().ParseString("Tf").identifier).toBe('Tf');
    expect(new EccaParser().ParseString("UP").identifier).toBe('UP');
    expect(new EccaParser().ParseString("D").identifier).toBe('D');
  });
});
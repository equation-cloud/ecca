import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (identifiers)', () => {
  it('will parse identifiers (constants or variables) to IElements of type "identifiers"', () => {
    expect(new EccaParser().ParseString("x").ElementTree.type).toBe('identifier');
    expect(new EccaParser().ParseString("up").ElementTree.type).toBe('identifier');
    expect(new EccaParser().ParseString("y").ElementTree.type).toBe('identifier');
    expect(new EccaParser().ParseString("Tf").ElementTree.type).toBe('identifier');
    expect(new EccaParser().ParseString("UP").ElementTree.type).toBe('identifier');
    expect(new EccaParser().ParseString("D").ElementTree.type).toBe('identifier');
  });
  it('will parse identifiers (constants or variables) to IElements of with the correct identifier', () => {
    expect(new EccaParser().ParseString("x").ElementTree.identifier).toBe('x');
    expect(new EccaParser().ParseString("up").ElementTree.identifier).toBe('up');
    expect(new EccaParser().ParseString("y").ElementTree.identifier).toBe('y');
    expect(new EccaParser().ParseString("Tf").ElementTree.identifier).toBe('Tf');
    expect(new EccaParser().ParseString("UP").ElementTree.identifier).toBe('UP');
    expect(new EccaParser().ParseString("D").ElementTree.identifier).toBe('D');
  });
});
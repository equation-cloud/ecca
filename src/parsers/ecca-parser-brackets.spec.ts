import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (brackets)', () => {
  it('will parse expresions within brackets to IElements of type "brackets"', () => {
    expect(ecca.Parser.ParseString("(0)").type).toBe('brackets');
    expect(ecca.Parser.ParseString("(1)").type).toBe('brackets');
    expect(ecca.Parser.ParseString("(8.53)").type).toBe('brackets');
    expect(ecca.Parser.ParseString("(-.534)").type).toBe('brackets');
    expect(ecca.Parser.ParseString("(2^6)").type).toBe('brackets');
  });
 it('will parse expresions within brackets to IElements with single operands', () => {
    expect(ecca.Parser.ParseString("(0)").operands.length).toBe(1);
    expect(ecca.Parser.ParseString("(1)").operands.length).toBe(1);
    expect(ecca.Parser.ParseString("(8.53)").operands.length).toBe(1);
    expect(ecca.Parser.ParseString("(-.534)").operands.length).toBe(1);
    expect(ecca.Parser.ParseString("(2^6)").operands.length).toBe(1);
  });
  it('will parse expresions within brackets to the correct operand type', () => {
    expect(ecca.Parser.ParseString("(0)").operands[0].type).toBe('integer');
    expect(ecca.Parser.ParseString("(1)").operands[0].type).toBe('integer');
    expect(ecca.Parser.ParseString("(8.53)").operands[0].type).toBe('fractional');
    expect(ecca.Parser.ParseString("(-.534)").operands[0].type).toBe('negate');
    expect(ecca.Parser.ParseString("(2^6)").operands[0].type).toBe('power');
  });
});

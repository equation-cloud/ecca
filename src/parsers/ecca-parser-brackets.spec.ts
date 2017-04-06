import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (brackets)', () => {
  it('will parse expresions within brackets to IElements of type "brackets"', () => {
    expect(new EccaParser().ParseString("(0)").type).toBe('brackets');
    expect(new EccaParser().ParseString("(1)").type).toBe('brackets');
    expect(new EccaParser().ParseString("(8.53)").type).toBe('brackets');
    expect(new EccaParser().ParseString("(-.534)").type).toBe('brackets');
    expect(new EccaParser().ParseString("(2^6)").type).toBe('brackets');
  });
 it('will parse expresions within brackets to IElements with single operands', () => {
    expect(new EccaParser().ParseString("(0)").operands.length).toBe(1);
    expect(new EccaParser().ParseString("(1)").operands.length).toBe(1);
    expect(new EccaParser().ParseString("(8.53)").operands.length).toBe(1);
    expect(new EccaParser().ParseString("(-.534)").operands.length).toBe(1);
    expect(new EccaParser().ParseString("(2^6)").operands.length).toBe(1);
  });
  it('will parse expresions within brackets to the correct operand type', () => {
    expect(new EccaParser().ParseString("(0)").operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString("(1)").operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString("(8.53)").operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString("(-.534)").operands[0].type).toBe('negate');
    expect(new EccaParser().ParseString("(2^6)").operands[0].type).toBe('power');
  });
});

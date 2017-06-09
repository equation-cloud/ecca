import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (brackets)', () => {
  it('will parse expresions within brackets to IElements of type "brackets"', () => {
    expect(new EccaParser().ParseString("(0)").ElementTree.type).toBe('brackets');
    expect(new EccaParser().ParseString("(1)").ElementTree.type).toBe('brackets');
    expect(new EccaParser().ParseString("(8.53)").ElementTree.type).toBe('brackets');
    expect(new EccaParser().ParseString("(-.534)").ElementTree.type).toBe('brackets');
    expect(new EccaParser().ParseString("(2^6)").ElementTree.type).toBe('brackets');
  });
 it('will parse expresions within brackets to IElements with single operands', () => {
    expect(new EccaParser().ParseString("(0)").ElementTree.operands.length).toBe(1);
    expect(new EccaParser().ParseString("(1)").ElementTree.operands.length).toBe(1);
    expect(new EccaParser().ParseString("(8.53)").ElementTree.operands.length).toBe(1);
    expect(new EccaParser().ParseString("(-.534)").ElementTree.operands.length).toBe(1);
    expect(new EccaParser().ParseString("(2^6)").ElementTree.operands.length).toBe(1);
  });
  it('will parse expresions within brackets to the correct operand type', () => {
    expect(new EccaParser().ParseString("(0)").ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString("(1)").ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString("(8.53)").ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString("(-.534)").ElementTree.operands[0].type).toBe('negate');
    expect(new EccaParser().ParseString("(2^6)").ElementTree.operands[0].type).toBe('power');
  });
});

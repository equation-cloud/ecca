import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (negatives)', () => {
  it('will generate IElements of type "negate"', () => {
    expect(new EccaParser().ParseString('-1').ElementTree.type).toBe('negate');
    expect(new EccaParser().ParseString('-.45').ElementTree.type).toBe('negate');
  });
  it('will generate IElements within expressions of the correct type', () => {
    expect(new EccaParser().ParseString('3+-3').ElementTree.operands[1].type).toBe('negate');
    expect(new EccaParser().ParseString('7.2*-1.44').ElementTree.operands[1].type).toBe('negate');
    expect(new EccaParser().ParseString('-0-0').ElementTree.operands[0].type).toBe('negate');
    expect(new EccaParser().ParseString('1/-0.8').ElementTree.operands[1].type).toBe('negate');
  })
});
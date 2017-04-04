import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (negatives)', () => {
  it('will generate IElements of type "negate"', () => {
    expect(new EccaParser().ParseString('-1').type).toBe('negate');
    expect(new EccaParser().ParseString('-.45').type).toBe('negate');
  });
  it('will generate IElements within expressions of the correct type', () => {
    expect(new EccaParser().ParseString('3+-3').operands[1].type).toBe('negate');
    expect(new EccaParser().ParseString('7.2*-1.44').operands[1].type).toBe('negate');
    expect(new EccaParser().ParseString('-0-0').operands[0].type).toBe('negate');
    expect(new EccaParser().ParseString('1/-0.8').operands[1].type).toBe('negate');
  })
});
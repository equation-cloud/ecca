import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (identifiers)', () => {
  it('will parse functions to IElements of type "function"', () => {
    expect(new EccaParser().ParseString("x(1)").ElementTree.type).toBe('function');
    expect(new EccaParser().ParseString("up(3)").ElementTree.type).toBe('function');
    expect(new EccaParser().ParseString("y(x,z)").ElementTree.type).toBe('function');
    expect(new EccaParser().ParseString("Tf(5.6,f(g))").ElementTree.type).toBe('function');
    expect(new EccaParser().ParseString("UP()").ElementTree.type).toBe('function');
    expect(new EccaParser().ParseString("D(2+x)").ElementTree.type).toBe('function');
  });
  it('will parse functions to IElements of with the correct identifier', () => {
    expect(new EccaParser().ParseString("x(1)").ElementTree.identifier).toBe('x');
    expect(new EccaParser().ParseString("up(3)").ElementTree.identifier).toBe('up');
    expect(new EccaParser().ParseString("y(x,z)").ElementTree.identifier).toBe('y');
    expect(new EccaParser().ParseString("Tf(5.6,f(g))").ElementTree.identifier).toBe('Tf');
    expect(new EccaParser().ParseString("UP()").ElementTree.identifier).toBe('UP');
    expect(new EccaParser().ParseString("D(2+x)").ElementTree.identifier).toBe('D');
  });
  it('will parse functions to IElements with the correct number of operands', () => {
    expect(new EccaParser().ParseString("x(1)").ElementTree.operands.length).toBe(1);
    expect(new EccaParser().ParseString("up(3)").ElementTree.operands.length).toBe(1);
    expect(new EccaParser().ParseString("y(x,z)").ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString("Tf(5.6,f(g))").ElementTree.operands.length).toBe(2);
    expect(new EccaParser().ParseString("UP()").ElementTree.operands.length).toBe(0);
    expect(new EccaParser().ParseString("D(2+x)").ElementTree.operands.length).toBe(1);
  });
  it('will parse functions to IElements with the correct operand types', () => {
    expect(new EccaParser().ParseString("x(1)").ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString("up(3)").ElementTree.operands[0].type).toBe('integer');
    expect(new EccaParser().ParseString("y(x,z)").ElementTree.operands[0].type).toBe('identifier');
    expect(new EccaParser().ParseString("y(x,z)").ElementTree.operands[1].type).toBe('identifier');
    expect(new EccaParser().ParseString("Tf(5.6,f(g))").ElementTree.operands[0].type).toBe('fractional');
    expect(new EccaParser().ParseString("Tf(5.6,f(g))").ElementTree.operands[1].type).toBe('function');
    expect(new EccaParser().ParseString("D(2+x)").ElementTree.operands[0].type).toBe('sum');
  });
});
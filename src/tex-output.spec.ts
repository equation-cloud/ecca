import { Expression } from './index'

describe('Expression : Raw TeX output', () => {
  it('will generate the correct TeX output for numbers', () => {
    expect(new Expression('0').rawTeX).toBe('0')
    expect(new Expression('1').rawTeX).toBe('1')
    expect(new Expression('.3').rawTeX).toBe('0.3')
    expect(new Expression('3.2').rawTeX).toBe('3.2')
    expect(new Expression('89.6665').rawTeX).toBe('89.6665')
  })
})
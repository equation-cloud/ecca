import { Expression } from './index'

describe('Expression : Constructor', () => {
  it('will generate an empty expression with no input', () => {
    expect(new Expression().ElementTree).toBeNull()
  })
  it('will generate the correct expression tree from a string input', () => {
    expect(new Expression('0').ElementTree.type).toBe('integer')
  })
  it('will throw an exception for an unknwon input type', () => {
    expect(() => {new Expression(1 as any)}).toThrow('Unknown type for constructing Expression: number')
  })
})
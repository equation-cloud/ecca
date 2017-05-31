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
  it('will generate the correct variable list from "y=y"', () => {
    let expression = new Expression('y=y');
    expect(expression.ElementTree.type).toBe('equals')
    expect(expression.ElementTree.operands.length).toBe(2)
    expect(expression.ElementTree.operands[0].type).toBe('identifier')
    expect(expression.ElementTree.operands[0].id).toBe('y0')
    expect(expression.ElementTree.operands[1].type).toBe('identifier')
    expect(expression.ElementTree.operands[1].id).toBe('y1')
    expect(expression.Variables[0].name).toBe('y')
    expect(expression.Variables[0].instances.length).toBe(2)
    expect(expression.Variables[0].instances[0]).toBe(expression.ElementTree.operands[0])
    expect(expression.Variables[0].instances[1]).toBe(expression.ElementTree.operands[1])
  })
})

describe('Expression : Lexer errors', () => {
  // No need to check actual errors, just that we do or do not get them
  it('will generate lexer errors from invalid inputs', () => {
    expect(new Expression('y=x<').LexerErrors.length).toEqual(1)
  })
  it('will generate no lexer errors from valid inputs', () => {
    expect(new Expression('y=x').LexerErrors).toBeUndefined()
  })
})
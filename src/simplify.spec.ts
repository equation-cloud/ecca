import { Expression } from './expression'
import { simplify } from './simplify'
import { UndefinedElement } from './elements'

describe('Simplification: Integer', () => {
  it('Should pass through integer elements', () => {
    let simplified = simplify(new Expression('1'))
    expect(simplified.type).toBe('integer')
    expect(simplified.value).toBe(1)
  })
})

describe('Simplification: Identifier', () => {
  it('Should pass through identifier elements', () => {
    let simplified = simplify(new Expression('x'))
    expect(simplified.type).toBe('identifier')
    expect(simplified.identifier).toBe('x')
  })
})

describe('Simplification: Undefined', () => {
  it('Should pass through identifier elements', () => {
    let simplified = simplify(new UndefinedElement())
    expect(simplified.type).toBe('undefined')
  })
})

import { EccaParser } from './ecca-parser'
import * as ecca from '../index'

describe('EccaParser: ParseString (undefined)', () => {
  it('will parse "null" to an undefined element', () => {
    expect(new EccaParser().ParseString("null").ElementTree.type).toBe('undefined');
  })
})

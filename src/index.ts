import { IParser } from './parser'
import { IElement } from './elements'
import { EccaParser } from './parsers/ecca-parser'
import { convertElement } from './tex-output'

export class Expression {
  private parser : IParser = new EccaParser()
  public ElementTree : IElement = null

  constructor (input? : string){
    if (!input) //to allow changing parser etc.
      return;
    switch(typeof input) {
      case 'string' :
        this.ElementTree = this.parser.ParseString(input);
        break;
      default :
        throw 'Unknown type for constructing Expression: ' + typeof input
    }
  }
}

export function generateRawTeXOutput(input : Expression | IElement) : string {
  if (input instanceof Expression) {
    return convertElement(input.ElementTree)
  } else {
    return convertElement(input)
  }
}
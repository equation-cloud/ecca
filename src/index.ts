import { IParser } from './parser'
import { IElement } from './elements'
import { EccaParser } from './parsers/ecca-parser'
import { generateRawTeXOutput } from './tex-output'

export class Expression {
  private parser : IParser = new EccaParser()
  private rawTeXLazy : string = ""
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

  public get rawTeX() {
    if (!this.rawTeXLazy) {
      this.rawTeXLazy = generateRawTeXOutput(this.ElementTree)
    }
    return this.rawTeXLazy
  }
}

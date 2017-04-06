import { IParser } from './parser'
import { IElement } from './elements'
import { EccaParser } from './parsers/ecca-parser'

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

  private constructString(element : IElement, dictionary : any) : string {
    if (element.operands) {
      let returnValue = ""
      element.operands.forEach(operand => {
        returnValue.concat(this.constructString(operand, dictionary))
      })
      return returnValue
    }
    if (dictionary[element.type]) {
      return dictionary[element.type]()
    }
  }

  get rawTeX() : string {
    let subst = {
      'identifier' : (element : IElement) => element.identifier,
      'integer' : (element : IElement) => element.value,
      'fractional' : (element : IElement) => 
    }
    return this.constructString(this.ElementTree, subst);
  }
}

import { IParser } from '../parser'
import { IElement, IntegerElement, FractionalElement } from '../elements'
import * as chev from 'chevrotain'

let integer = chev.createToken({name: "integer", pattern: /0|[1-9]\d*/});
let decimal = chev.createToken({name: "decimal", pattern: /\.\d+|0\.\d+|[1-9]\d*\.\d+/});
let AllTokens = [decimal, integer];

export class EccaParser implements IParser {
  private lexer : chev.Lexer = null;
  private parser : Parser = null;

  constructor(){
    this.lexer = new chev.Lexer(AllTokens);
    this.parser = new Parser();
  }

  ParseString(input : string) : IElement {
    let lexerResult = this.lexer.tokenize(input);
    this.parser.input = lexerResult.tokens;
    return this.parser['Number']();
  }
}

interface Parser {
  Integer? : () => IElement;
  Decimal? : () => IElement;
}

class Parser extends chev.Parser implements IParser {
  constructor() {
    super([], AllTokens);

    this.RULE<IElement>("Number", () => {
      return this.OR<IElement>([
        {ALT: () => { return this.SUBRULE<IElement>(this.Integer); }},
        {ALT: () => { return this.SUBRULE<IElement>(this.Decimal); }},
      ]);
    });

    this.RULE<IElement>("Integer", () => {
      return new IntegerElement(this.CONSUME(integer).image); //this is not correct, but getImage doesn't seem to be defined.
    });

    this.RULE<IElement>("Decimal", () => {
      let decimalString : string = this.CONSUME(decimal).image; //this is not correct, but getImage doesn't seem to be defined.
      let decimalSplit = decimalString.split('.');
      console.log(decimalString, decimalSplit);
      if(decimalSplit[0] === "") {
        return new FractionalElement("0", decimalSplit[1]); //number had no leading 0 (i.e. .97)
      } else {
        return new FractionalElement(decimalSplit[0], decimalSplit[1]);
      }
    });

    chev.Parser.performSelfAnalysis(this);
  }
}
import { IParser } from '../parser'
import { 
  IElement, 
  IntegerElement, 
  FractionalElement, 
  DivisionElement
} from '../elements'
import * as chev from 'chevrotain'

let integer = chev.createToken({name: "integer", pattern: /0|[1-9]\d*/});
let decimal = chev.createToken({name: "decimal", pattern: /\.\d+|0\.\d+|[1-9]\d*\.\d+/});
let divide = chev.createToken({name: "divide", pattern: /\//});
let AllTokens = [decimal, integer, divide];

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
    return this.parser['Division']();
  }
}

interface Parser {
  Integer? : () => IElement;
  Decimal? : () => IElement;
  Number? : () => IElement;
  Divide? : () => IElement;
}

class Parser extends chev.Parser implements IParser {
  constructor() {
    super([], AllTokens);

    this.RULE<IElement>('Division', () => {
      let operands: IElement[] = [];
      operands.push(this.SUBRULE1<IElement>(this.Number));
      this.OPTION(() => {
        this.CONSUME(divide);
        operands.push(this.SUBRULE2<IElement>(this.Number));
      });
      if(operands.length == 1) {
        return operands[0];
      } else {
        return new DivisionElement(operands);
      }
    });

    this.RULE<IElement>('Number', () => {
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
      if(decimalSplit[0] === "") {
        return new FractionalElement("0", decimalSplit[1]); //number had no leading 0 (i.e. .97)
      } else {
        return new FractionalElement(decimalSplit[0], decimalSplit[1]);
      }
    });

    chev.Parser.performSelfAnalysis(this);
  }
}
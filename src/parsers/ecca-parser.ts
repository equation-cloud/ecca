import {IParser} from '../parser'
import * as chev from 'chevrotain'

let integer = chev.createToken({name: "integer", pattern: /0|[1-9]\d*/});
let AllTokens = [
  integer
];

export class EccaParser implements IParser {
  private lexer : chev.Lexer = null;
  private parser : Parser = null;

  constructor(){
    this.lexer = new chev.Lexer(AllTokens);
    this.parser = new Parser();
  }

  ParseString(input : string) : any {
    let lexerResult = this.lexer.tokenize(input);
    this.parser.input = lexerResult.tokens;
    return this.parser['Integer']();
  }
}

class Parser extends chev.Parser {
  constructor() {
    super([], AllTokens);

    this.RULE("Integer", () => {
      return this.CONSUME(integer).image; //this is not correct I think, but getImage doesn't seem to be defined.
    })

    chev.Parser.performSelfAnalysis(this);
  }
}
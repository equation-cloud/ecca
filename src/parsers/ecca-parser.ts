import {IParser} from '../parser'
import * as chev from 'chevrotain'

export class EccaParser implements IParser {
  private lexer : chev.Lexer = null;
  private tokens : chev.TokenConstructor[] = [];

  constructor(){
    this.tokens = [
      chev.createToken({name: "integer", pattern: /0|[1-9]\d+/}),
    ];
    this.lexer = new chev.Lexer(this.tokens);
  }

  ParseString(input : string) : chev.ILexingResult {
    let result = this.lexer.tokenize(input);
    console.log(this.lexer);
    console.log(input, result);
    return result;
  }
}

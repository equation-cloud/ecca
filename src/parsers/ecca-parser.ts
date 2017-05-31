import { 
  IParser,
  IParseResult
} from '../parser'
import { 
  IElement, 
  IntegerElement, 
  FractionalElement, 
  BracketsElement,
  NegateElement,
  PowerElement,
  DivisionElement,
  ProductElement,
  SumElement,
  SubtractionElement,
  EqualsElement,
  IdentifierElement,
} from '../elements'
import * as chev from 'chevrotain'

let integer = chev.createToken({name: 'integer', pattern: /0|[1-9]\d*/});
let decimal = chev.createToken({name: 'decimal', pattern: /\.\d+|0\.\d+|[1-9]\d*\.\d+/});
let openBracket = chev.createToken({name: 'openBracket', pattern: /\(/});
let closeBracket = chev.createToken({name: 'closeBracket', pattern: /\)/});
let power = chev.createToken({name: 'power', pattern: /\^/});
let divide = chev.createToken({name: 'divide', pattern: /\//});
let multiply = chev.createToken({name: 'multiply', pattern: /\*/});
let plus = chev.createToken({name: 'plus', pattern: /\+/});
let minus = chev.createToken({name: 'minus', pattern: /-/});
let equals = chev.createToken({name: 'equals', pattern: /=/});
let identifier = chev.createToken({name: 'identifier', pattern: /[a-zA-Z]+/})
let allTokens = [decimal, integer, openBracket, closeBracket, power, divide, multiply, plus, minus, equals, identifier];


export class EccaParser implements IParser {
  private lexer : chev.Lexer = null;
  private parser : Parser = null;

  constructor(){
    this.lexer = new chev.Lexer(allTokens);
    this.parser = new Parser();
  }

  public ParseString(input : string) : IParseResult {
    let lexerResult = this.lexer.tokenize(input);
    this.parser.input = lexerResult.tokens;
    let result: IParseResult = { ElementTree: this.parser['Equals']() };
    if (lexerResult.errors.length > 0) {
      result.LexerErrors = lexerResult.errors;
    }
    return result;
  }
}

interface Parser {
  Identifier? : () => IElement;
  Integer? : () => IElement;
  Decimal? : () => IElement;
  Atomic? : () => IElement;
  Power? : () => IElement;
  Division? : () => IElement;
  Product? : () => IElement;
  Sum? : () => IElement;
  Subtraction? : () => IElement;
  Equals? : () => IElement;
}

class Parser extends chev.Parser {
  constructor() {
    super([], allTokens);

    this.RULE<IElement>('Equals', () => {
      let operands: IElement[] = [this.SUBRULE1<IElement>(this.Subtraction)];
      this.OPTION(() => {
        this.CONSUME(equals);
        operands.push(this.SUBRULE2<IElement>(this.Subtraction));
      });
      if(operands.length == 1) {
        return operands[0];
      } else {
        return new EqualsElement(operands);
      }
    });

    this.RULE<IElement>('Subtraction', () => {
      let operands: IElement[] = [this.SUBRULE1<IElement>(this.Sum)];
      this.OPTION(() => {
        this.CONSUME(minus);
        operands.push(this.SUBRULE2<IElement>(this.Sum));
      });
      if(operands.length == 1) {
        return operands[0];
      } else {
        return new SubtractionElement(operands);
      }
    });

    this.RULE<IElement>('Sum', () => {
      let operands: IElement[] = [this.SUBRULE1<IElement>(this.Product)];
      this.MANY(() => {
        this.CONSUME(plus);
        operands.push(this.SUBRULE2<IElement>(this.Product));
      });
      if(operands.length == 1) {
        return operands[0];
      } else {
        return new SumElement(operands);
      }
    });

    this.RULE<IElement>('Product', () => {
      let operands: IElement[] = [this.SUBRULE1<IElement>(this.Division)];
      this.MANY(() => {
        this.CONSUME(multiply);
        operands.push(this.SUBRULE2<IElement>(this.Division));
      });
      if(operands.length == 1) {
        return operands[0];
      } else {
        return new ProductElement(operands);
      }
    });

    this.RULE<IElement>('Division', () => {
      let operands: IElement[] = [this.SUBRULE1<IElement>(this.Power)];
      this.OPTION(() => {
        this.CONSUME(divide);
        operands.push(this.SUBRULE2<IElement>(this.Power));
      });
      if(operands.length == 1) {
        return operands[0];
      } else {
        return new DivisionElement(operands);
      }
    });

    this.RULE<IElement>('Power', () => {
      let operands: IElement[] = [this.SUBRULE1<IElement>(this.Atomic)];
      this.OPTION(() => {
        this.CONSUME(power);
        operands.push(this.SUBRULE2<IElement>(this.Atomic));
      });
      if(operands.length == 1) {
        return operands[0];
      } else {
        return new PowerElement(operands);
      }
    })

    this.RULE<IElement>('Atomic', () => {
      let negate = false;
      this.OPTION(() => {
        this.CONSUME(minus);
        negate = true;
      });
      let operand = this.OR<IElement>([
        {ALT: () => { return this.SUBRULE<IElement>(this.Identifier); }},
        {ALT: () => { return this.SUBRULE<IElement>(this.Integer); }},
        {ALT: () => { return this.SUBRULE<IElement>(this.Decimal); }},
        {ALT: () => { 
          this.CONSUME(openBracket);
          let operand = this.SUBRULE<IElement>(this.Subtraction);
          this.CONSUME(closeBracket);
          return new BracketsElement(operand);
        }},
      ]);
      if(negate) {
        return new NegateElement(operand);
      } else {
        return operand;
      }
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

    this.RULE<IElement>("Identifier", () => {
      return new IdentifierElement(this.CONSUME(identifier).image);
    });

    chev.Parser.performSelfAnalysis(this);
  }
}
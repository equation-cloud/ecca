import { 
  IParser,
  IParseResult
} from '../parser'
import { 
  IElement, 
  EqualsElement,
  SubtractionElement,
  SumElement,
  ProductElement,
  DivisionElement,
  PowerElement,
  FactorialElement,
  NegateElement,
  BracketsElement,
  FunctionElement,
  IntegerElement, 
  FractionalElement, 
  IdentifierElement,
} from '../elements'
import * as chev from 'chevrotain'

let equals = chev.createToken({name: 'equals', pattern: /=/});
let minus = chev.createToken({name: 'minus', pattern: /-/});
let plus = chev.createToken({name: 'plus', pattern: /\+/});
let multiply = chev.createToken({name: 'multiply', pattern: /\*/});
let divide = chev.createToken({name: 'divide', pattern: /\//});
let power = chev.createToken({name: 'power', pattern: /\^/});
let factorial = chev.createToken({name: 'factorial', pattern: /!/});
let openBracket = chev.createToken({name: 'openBracket', pattern: /\(/});
let closeBracket = chev.createToken({name: 'closeBracket', pattern: /\)/});
let comma = chev.createToken({name: 'comma', pattern: /,/});
let integer = chev.createToken({name: 'integer', pattern: /0|[1-9]\d*/});
let decimal = chev.createToken({name: 'decimal', pattern: /\.\d+|0\.\d+|[1-9]\d*\.\d+/});
let identifier = chev.createToken({name: 'identifier', pattern: /[a-zA-Z]+/})
let allTokens = [decimal, integer, openBracket, closeBracket, comma, factorial, power, divide, multiply, plus, minus, equals, identifier];


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
    if (lexerResult.errors && lexerResult.errors.length && lexerResult.errors.length > 0) {
      result.LexerErrors = lexerResult.errors;
    }
    if (this.parser.errors && this.parser.errors.length && this.parser.errors.length > 0) {
      result.ParserErrors = this.parser.errors;
    }
    return result;
  }
}

interface Parser {
  Equals? : () => IElement;
  Subtraction? : () => IElement;
  Sum? : () => IElement;
  Product? : () => IElement;
  ImplicitOrDivision? : () => IElement;
  ImplicitProduct? : () => IElement;
  Division? : () => IElement;
  Power? : () => IElement;
  Factorial? : () => IElement;
  Negate? : () => IElement;
  Brackets? : () => BracketsElement;
  Function? : () => FunctionElement;
  Number? : () => IElement;
  Integer? : () => IntegerElement;
  Decimal? : () => FractionalElement;
  Identifier? : () => IdentifierElement;
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
      return operands.length == 1 ? operands[0] : new SubtractionElement(operands);
    });

    this.RULE<IElement>('Sum', () => {
      let operands: IElement[] = [this.SUBRULE1<IElement>(this.Product)];
      this.MANY(() => {
        this.CONSUME(plus);
        operands.push(this.SUBRULE2<IElement>(this.Product));
      });
      return operands.length == 1 ? operands[0] : new SumElement(operands);
    });

    this.RULE<IElement>('Product', () => {
      let operands: IElement[] = [this.SUBRULE1<IElement>(this.ImplicitOrDivision)];
      this.MANY(() => {
        this.CONSUME(multiply);
        operands.push(this.SUBRULE2<IElement>(this.ImplicitOrDivision));
      });
      return operands.length == 1 ? operands[0] : new ProductElement(operands);
    });

    this.RULE<IElement>('ImplicitOrDivision' , () => {
      return this.OR([
        {ALT: () => this.SUBRULE<IElement>(this.ImplicitProduct)},
        {ALT: () => this.SUBRULE<IElement>(this.Division)}
      ])
    })

    this.RULE<IElement>('ImplicitProduct', () => {
      let negate: boolean = false;
      this.OPTION(() => {
        this.CONSUME(minus);
        negate = true;
      });
      let product = this.OR<IElement>([
        {ALT: () => {
          return new ProductElement([
            this.SUBRULE1<IElement>(this.Number),
            this.SUBRULE<IElement>(this.Identifier)
          ]);
        }},
        {ALT: () => {
          let operands = [this.SUBRULE2<IElement>(this.Number)];
          this.AT_LEAST_ONE(() => {
            operands.push(this.SUBRULE<IElement>(this.Brackets))
          });
          return new ProductElement(operands);
        }}
      ]);
      return negate ? new NegateElement(product) : product;
    });

    this.RULE<IElement>('Division', () => {
      let operands: IElement[] = [this.SUBRULE1<IElement>(this.Power)];
      this.OPTION(() => {
        this.CONSUME(divide);
        operands.push(this.SUBRULE2<IElement>(this.Power));
      });
      return operands.length == 1 ? operands[0] : new DivisionElement(operands);
    });

    this.RULE<IElement>('Power', () => {
      let operands: IElement[] = [this.SUBRULE1<IElement>(this.Factorial)];
      this.OPTION(() => {
        this.CONSUME(power);
        operands.push(this.SUBRULE2<IElement>(this.Factorial));
      });
      return operands.length == 1 ? operands[0] : new PowerElement(operands);
    });

    this.RULE<IElement>('Factorial', () => {
      let negateElement = this.SUBRULE<IElement>(this.Negate);
      let isFactorial = false;
      this.OPTION(() => {
        this.CONSUME(factorial);
        isFactorial = true;
      });
      return isFactorial ? new FactorialElement(negateElement) : negateElement;
    });

    this.RULE<IElement>('Negate', () => {
      let isNegative = false;
      this.OPTION(() => {
        this.CONSUME(minus);
        isNegative = true;
      });
      let operand = this.OR<IElement>([
        {ALT: () => { return this.SUBRULE<IElement>(this.Function); }},
        {ALT: () => { return this.SUBRULE<IElement>(this.Number); }},
        {ALT: () => { return this.SUBRULE<IElement>(this.Identifier); }},
        {ALT: () => { return this.SUBRULE<IElement>(this.Brackets); }}
      ]);
      return isNegative ? new NegateElement(operand) : operand;
    });

    this.RULE<BracketsElement>('Brackets', () => {
      this.CONSUME(openBracket);
      let returnValue = this.SUBRULE(this.Subtraction);
      this.CONSUME(closeBracket);
      return new BracketsElement(returnValue);
    });

    this.RULE<IElement>('Function', () => {
      let functionId = this.SUBRULE<IdentifierElement>(this.Identifier);
      this.CONSUME(openBracket);
      let operands = [];
      this.MANY_SEP({SEP: comma, DEF: () => {
        operands.push(this.SUBRULE(this.Subtraction));
      }});
      this.CONSUME(closeBracket);
      return new FunctionElement(functionId, operands);
    });

    this.RULE<IElement>("Number", () => {
      return this.OR<IElement>([
        {ALT: () => this.SUBRULE(this.Integer)},
        {ALT: () => this.SUBRULE(this.Decimal)}
      ]);
    });

    this.RULE<IElement>("Integer", () => new IntegerElement(this.CONSUME(integer).image)); //this is not correct, but getImage doesn't seem to be defined.

    this.RULE<IElement>("Decimal", () => {
      let decimalString : string = this.CONSUME(decimal).image; //this is not correct, but getImage doesn't seem to be defined.
      let decimalSplit = decimalString.split('.');
      if(decimalSplit[0] === "") {
        return new FractionalElement("0", decimalSplit[1]); //number had no leading 0 (i.e. .97)
      } else {
        return new FractionalElement(decimalSplit[0], decimalSplit[1]);
      }
    });

    this.RULE<IElement>("Identifier", () => new IdentifierElement(this.CONSUME(identifier).image));

    chev.Parser.performSelfAnalysis(this);
  }
}
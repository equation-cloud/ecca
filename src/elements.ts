export interface IElement {
  type: string;
  id?: string;
  //VariableElement
  identifier?: string;
  //IntegerElement
  value?: number;
  //FractionalElement
  numerator?: number;
  denominator?: number;
  //OperatorElement
  operands?: IElement[];
}

export class IdentifierElement implements IElement {
  public type : string;
  public identifier : string;

  constructor(identifier: string) {
    this.type = 'identifier';
    this.identifier = identifier;
  }
}

export abstract class ValueElement implements IElement {
  public type : string
  public value : number

  constructor(type: string, value: number) {
    this.type = type
    this.value = value
  }
}

export class IntegerElement extends ValueElement {
  constructor(value : string) {
    super('integer', parseInt(value))
  }
}

export class FractionalElement extends ValueElement {
  public denominator : number;
  public numerator : number;

  constructor(integerPart : string, fractionalPart : string) {
    let denominator : number = Math.pow(10, fractionalPart.length);
    let numerator : number = parseInt(integerPart) * denominator + parseInt(fractionalPart);
    super('fractional', numerator / denominator)
    this.denominator = denominator
    this.numerator = numerator;
  }
}

export class UndefinedElement extends ValueElement {
  constructor() {
    super('undefined', NaN)
  }
}

export abstract class OperatorElement implements IElement {
  public type : string;
  public operands: IElement[];

  constructor(type: string, operands: IElement[]){
    this.type = type;
    this.operands = operands;
  }
}

export class BracketsElement extends OperatorElement {
  constructor(operand: IElement) { 
    super('brackets', [operand]);
  }
}

export class NegateElement extends OperatorElement {
  constructor(operand: IElement) {
    super('negate', [operand]);
  }
}

export class PowerElement extends OperatorElement {
  constructor(operands: IElement[]) {
    super('power', operands);
  }
}

export class DivisionElement extends OperatorElement {
  constructor(operands: IElement[]) {
    super('division', operands);
  }
}

export class ProductElement extends OperatorElement {
  constructor(operands: IElement[]) {
    super('product', operands);
  }
}

export class SumElement extends OperatorElement {
  constructor(operands: IElement[]) {
    super('sum', operands);
  }
}

export class SubtractionElement extends OperatorElement {
  constructor(operands: IElement[]) {
    super('subtraction', operands);
  }
}

export class EqualsElement extends OperatorElement {
  constructor(operands: IElement[]) {
    super('equals', operands);
  }
}
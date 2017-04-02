export interface IElement {
  type: string;
  //IntegerElement
  value?: number;
  //FractionalElement
  numerator?: number;
  denominator?: number;
  //OperatorElement
  operands?: IElement[];
}

export class IntegerElement implements IElement {
  public type : string;
  public value : number;

  constructor(value : string) {
    this.type = 'integer';
    this.value = parseInt(value);
  }
}

export class FractionalElement implements IElement {
  public type : string;
  public denominator : number;
  public numerator : number;

  constructor(integerPart : string, fractionalPart : string) {
    this.type = 'fractional';
    this.denominator = Math.pow(10, fractionalPart.length);
    this.numerator = parseInt(integerPart) * this.denominator + parseInt(fractionalPart);
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

export class NegateElement extends OperatorElement {
  constructor(operand: IElement) {
    super('negate', [operand]);
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
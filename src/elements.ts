export interface IElement {
  type: string;
  //IntegerElement
  value?: number;
  //FractionalElement
  numerator?: number;
  denominator?: number;
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
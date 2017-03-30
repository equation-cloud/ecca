export interface IElement {
  type: string;
  value?: number;
}

export class IntegerElement implements IElement {
  public value : number;
  public type : string;

  constructor(value : string) {
    this.type = 'integer';
    this.value = parseInt(value);
  }
}
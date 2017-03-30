export class Expression {
  private inputString : string;
  
  get InputString() : string { return this.inputString; }
  set InputString(inputString: string) {
    this.inputString = inputString;
  }
}
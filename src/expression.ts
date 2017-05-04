import { IElement } from './elements'
import { IParser } from './parser'
import { EccaParser } from './parsers/ecca-parser'

export class Variable {
  public instances: IElement[];

  constructor(public name: string, instance: IElement) {
    this.instances = [instance];
  }
}

export class Expression {
  private parser : IParser = new EccaParser()
  public ElementTree : IElement = null
  private variableList : Variable[] = [];

  get Variables() : ReadonlyArray<Variable> {
    return this.variableList
  }

  constructor (input? : string) {
    if (!input) //to allow changing parser etc.
      return;
    switch(typeof input) {
      case 'string' :
        this.ElementTree = this.parser.ParseString(input);
        this.getVariableList(this.ElementTree);
        break;
      default :
        throw 'Unknown type for constructing Expression: ' + typeof input
    }
  }

  private getVariableList(element: IElement): void {
    //traverse tree and determine all possible variables
    if(element.operands) {
      element.operands.forEach(operand => this.getVariableList(operand))
    } else {
      if(element.type === 'identifier') {
        let matchingVariables = this.variableList.filter(variable => variable.name == element.identifier)
        if(matchingVariables.length === 0) {
          this.variableList.push(new Variable(element.identifier, element));
          element.id = element.identifier + "0"
        } else {
          element.id = element.identifier + matchingVariables[0].instances.length.toFixed(0);
          matchingVariables[0].instances.push(element);
        }
      }
    }
  }
}

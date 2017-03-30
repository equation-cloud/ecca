import { IParser } from "./parser"
import { EccaParser } from './parsers/ecca-parser'
import { Equation } from "./equation"

export var Parser : IParser = new EccaParser();

export function CreateEquation(inputString : string) : Equation {
  let equation = new Equation();
  equation.InputString = inputString;
  return equation;
}
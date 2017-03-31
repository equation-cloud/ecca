import { IElement } from './elements';

export interface IParser {
  ParseString(input: string) : IElement;
}
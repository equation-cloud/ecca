import { IElement } from './elements';

export interface ILexerError {
  column: number;
  offset: number;
  length: number;
  message: string;
}

export interface IParseResult {
  ElementTree: IElement;
  LexerErrors?: ILexerError[];
  ParserErrors?: any[];
}

export interface IParser {
  ParseString(input: string) : IParseResult;
}
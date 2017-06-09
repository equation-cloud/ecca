import { IElement } from './elements';

export interface ILexerError {
  column: number;
  offset: number;
  length: number;
  message: string;
}

export interface IParserError {
  name: string;
  message: string;
}

export interface IParseResult {
  ElementTree: IElement;
  LexerErrors?: ILexerError[];
  ParserErrors?: IParserError[];
}

export interface IParser {
  ParseString(input: string) : IParseResult;
}
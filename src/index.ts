import { IParser } from "./parser"
import { EccaParser } from './parsers/ecca-parser'

export var Parser : IParser = new EccaParser();

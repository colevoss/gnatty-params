import { BaseVal, ISchema, SchemaType } from './BaseVal';
import { NumberVal } from './NumberVal';
import { StringVal } from './StrinVal';
import { ObjectVal, IProperties } from './ObjectVal';
import { ArrayVal } from './ArrayVal';

export function number() {
  return new NumberVal();
}

export function string() {
  return new StringVal();
}

export function array(...types: any) {
  return ArrayVal.of(...types);
}

export function object(schema: IProperties) {
  return ObjectVal.of(schema);
}

// const schem = object({
//   balls: string().maxLength(3).minLength(1).format('date'),
//   test: object({
//     something: StringVal.init(),
//   }),
//   num: number().integer().maximum(1).optional(),
//   arr: array(
//     object({
//       hello: number(),
//     }),
//   ),
// }).compile();

// console.log(JSON.stringify(schem, null, 2));

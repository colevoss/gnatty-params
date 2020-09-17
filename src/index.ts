import { Validator } from './Validator';
import * as Vali from './ValidatorTypes';

const testSchema = Vali.object({
  num: Vali.number().multipleOf(4),
  string: Vali.string().maxLength(4),
  arr: Vali.array(Vali.string().minLength(2)),
});

const data = {
  num: 8,
  string: 'hi',
  arr: ['h'],
};

const myVal = new Validator(testSchema);
console.log(JSON.stringify(myVal.rawSchema, null, 2));

const validated = myVal.validate(data);

console.log(JSON.stringify(validated, null, 2));
console.log(validated.errorStrings());

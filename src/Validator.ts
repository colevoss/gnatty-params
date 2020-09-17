import * as Ajv from 'ajv';
import { BaseVal } from './BaseVal';

export class Validator<Val extends BaseVal> {
  private ajv: Ajv.Ajv;
  public rawSchema: any;
  private validator: Ajv.ValidateFunction;

  constructor(schema: Val, options?: Ajv.Options) {
    this.ajv = new Ajv(options);
    this.rawSchema = schema.compile();
    this.validator = this.ajv.compile(this.rawSchema);
  }

  public validate(data: any) {
    const valid = this.validator(data);

    const errors = this.validator.errors;
    const isValid = valid;

    return {
      isValid,
      errors,
      errorStrings: () => this.ajv.errorsText(errors),
    };
  }
}

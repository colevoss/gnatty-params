import { BaseVal, ISchema, SchemaType } from './BaseVal';

export interface INumSchema extends ISchema {
  type: SchemaType.Number;
  maximum?: number;
  minimum?: number;
  multipleOf?: number;
}

export class NumberVal extends BaseVal {
  public type = SchemaType.Number;

  private schema: {
    maximum?: number;
    minimum?: number;
    multipleOf?: number;
  } = {};

  public integer() {
    this.type = SchemaType.Integer;

    return this;
  }

  public maximum(max: number) {
    this.schema.maximum = max;

    return this;
  }

  public minimum(min: number) {
    this.schema.minimum = min;

    return this;
  }

  public multipleOf(mult: number) {
    this.schema.multipleOf = mult;

    return this;
  }

  static init() {
    const numType = new NumberVal();

    return numType;
  }

  public compile(): INumSchema {
    const schema: any = super.compile();

    return {
      ...schema,
      ...this.schema,
    };
  }
}

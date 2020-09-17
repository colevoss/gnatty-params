import { BaseVal, ISchema, SchemaType } from './BaseVal';

export type FormatType =
  | 'date'
  | 'date-time'
  | 'uri'
  | 'email'
  | 'hostname'
  | 'ipv4'
  | 'ipv6'
  | 'regex';

export interface IStringSchema extends ISchema {
  type: SchemaType.String;
  minLength?: number;
  maxLength?: number;
  format?: FormatType;
}

export class StringVal extends BaseVal {
  public type = SchemaType.String;

  private schema: {
    maxLength?: number;
    minLength?: number;
    format?: string;
  } = {};

  public maxLength(max: number) {
    this.schema.maxLength = max;

    return this;
  }

  public minLength(min: number) {
    this.schema.minLength = min;

    return this;
  }

  public format(format: FormatType) {
    this.schema.format = format;

    return this;
  }

  static init() {
    const strType = new StringVal();

    return strType;
  }

  public compile(): IStringSchema {
    const schema: any = super.compile();

    return {
      ...schema,
      ...this.schema,
    };
  }
}

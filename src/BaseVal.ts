// export type SchemaType = 'string' | 'number' | 'object' | 'array';
export enum SchemaType {
  String = 'string',
  Number = 'number',
  Integer = 'integer',
  Object = 'object',
  Array = 'array',
}

export interface ISchema {
  type: SchemaType;
  enum?: any[];
}

export abstract class BaseVal {
  public abstract type: SchemaType;
  public enumValues?: any[];

  public isRequired: boolean = true;

  public optional() {
    this.isRequired = false;

    return this;
  }

  public enum(values: any[]) {
    this.enumValues = values;

    return this;
  }

  private enumSchema() {
    if (!this.enumValues || this.enumValues.length === 0) {
      return {};
    }

    return {
      enum: this.enumValues,
    };
  }

  public compile(): ISchema {
    const schema = {
      type: this.type,
      ...this.enumSchema(),
    };

    return schema;
  }
}

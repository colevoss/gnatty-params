import { BaseVal, ISchema, SchemaType } from './BaseVal';

export interface IArraySchema extends ISchema {
  type: SchemaType.Array;
  items: any | any[];
}

export class ArrayVal extends BaseVal {
  public type = SchemaType.Array;
  public items: any | any[];

  constructor(...types: any) {
    super();

    if (types.length === 1) {
      this.items = types[0].compile();

      return;
    }

    this.items = [];

    for (let t of types) {
      this.items.push(t.compile());
    }
  }

  static of(...type: any) {
    const arrType = new ArrayVal(...type);

    return arrType;
  }

  public compile(): IArraySchema {
    const schema: any = super.compile();

    schema.items = this.items;

    return schema;
  }
}

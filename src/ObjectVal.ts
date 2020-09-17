import { BaseVal, ISchema, SchemaType } from './BaseVal';
import { NumberVal } from './NumberVal';
import { StringVal } from './StrinVal';
import { ArrayVal } from './ArrayVal';

export interface IObjectSchema extends ISchema {
  type: SchemaType.Object;
  properties: any;
  required: string[];
  additionalProperties: boolean;
}

export type IProperties = {
  [key: string]: NumberVal | StringVal | ObjectVal | ArrayVal;
};

export class ObjectVal extends BaseVal {
  public type = SchemaType.Object;
  public properties: IProperties = {};
  public requiredProps: string[] = [];
  public _additionalProperties: boolean = false;

  constructor(valSchema: IProperties) {
    super();

    for (let key in valSchema) {
      const type: BaseVal = valSchema[key];

      if (type.isRequired) {
        this.addRequired(key);
      }

      this.addProperty(key, type.compile());
    }
  }

  public additionalProperties() {
    this._additionalProperties = true;

    return this;
  }

  private addRequired(key: string) {
    this.requiredProps.push(key);
  }

  private addProperty(key: string, schema: any) {
    this.properties[key] = schema;
  }

  static of(schmea: IProperties) {
    const valObj = new ObjectVal(schmea);

    return valObj;
  }

  public compile(): IObjectSchema {
    const schema: any = super.compile();

    if (this.requiredProps.length) {
      schema.required = this.requiredProps;
    }

    schema.properties = this.properties;
    schema.additionalProperties = this._additionalProperties;

    return schema;
  }
}

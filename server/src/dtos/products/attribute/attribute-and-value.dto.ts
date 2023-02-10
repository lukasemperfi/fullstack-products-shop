export interface AttributeAndValue {
  id: number;
  name: string;
  values: {
    id: number;
    value: string;
    order: number;
  }[];
}

export interface AttributeValue {
  id: string;
  value: string;
}

export interface CreateAttributeDto {
  id: string;
  name: string;
  values: AttributeValue[];
}

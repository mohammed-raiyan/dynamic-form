// form-field.model.ts
export interface FormFieldJSON {
  name: string;
  label: string;
  value: string;
  type: string;
  validations: ValidatorJSON;
  options: OptionJSON[];
  disabled: boolean;
}

export interface ValidatorJSON {
  isRequired?: boolean;
  email?: boolean;
  min: number;
  max?: number;
  pattern?: string;
}

export interface OptionJSON {
  label: string;
  value: string;
}

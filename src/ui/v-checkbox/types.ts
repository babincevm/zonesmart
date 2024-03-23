export interface IProps {
  name?: string;
  modelValue?: boolean;
  disabled?: boolean;
}

export interface IEmit {
  (e: 'update:modelValue', value: boolean): void;
}

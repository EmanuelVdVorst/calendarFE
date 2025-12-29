import { type InputHTMLAttributes } from 'react';


interface InputFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'value'
  > {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}

interface ExplicitInputFieldProps extends InputFieldProps {
  type: string;
}

export type {
    InputFieldProps,
    ExplicitInputFieldProps
}

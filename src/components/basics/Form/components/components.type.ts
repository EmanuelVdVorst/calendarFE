import type {  InputHTMLAttributes } from 'react';


interface LabelProps {
    label: string;
}

interface LabelIdProps extends LabelProps {
    id: string;
}


interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value'> {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

export type {
    LabelIdProps,
    LabelProps,
    InputProps
}
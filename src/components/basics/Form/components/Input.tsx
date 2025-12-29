import type { ReactElement } from 'react';

import { StyledInput } from './components.style';
import type { InputProps } from './components.type';


export function Input({
  id,
  value,
  onChange,
  ...inputProps
}: InputProps): ReactElement {
  return (
    <StyledInput
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      {...inputProps}
    />
  );
}
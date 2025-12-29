import type { ReactElement } from 'react';

import { StyledLabel } from "./components.style";
import type { LabelIdProps } from "./components.type";

function Label({ label, id }: LabelIdProps): ReactElement {
  return (
      <StyledLabel htmlFor={id}>{label}</StyledLabel>
  );
}

export { Label }
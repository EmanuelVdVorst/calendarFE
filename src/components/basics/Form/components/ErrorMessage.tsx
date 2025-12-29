import type { ReactElement } from 'react';

import { StyledErrorMessage } from "./components.style";
import type { LabelProps } from "./components.type";


function ErrorMessage({ label }: LabelProps): ReactElement {
  return (
      <StyledErrorMessage>{label}</StyledErrorMessage>
  );
}
export { ErrorMessage }
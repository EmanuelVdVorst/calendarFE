import type { FormEvent, ReactElement} from 'react';

import { StyledFormContainer } from './Form.style';
import type { FormProps } from './Form.type';


function Form({ onSubmit, children, className }: FormProps): ReactElement{
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    void onSubmit();
  };

  return (
    <StyledFormContainer onSubmit={handleSubmit} className={className}>
      {children}
    </StyledFormContainer>
  );
}

export {
  Form
}

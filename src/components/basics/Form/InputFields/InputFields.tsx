import type { ReactElement } from 'react';

import { StyledFormGroup, StyledStartToEndInputField } from "./InputFields.styles";
import type { InputFieldProps, ExplicitInputFieldProps } from './InputFields.type';
import { Label, Input, ErrorMessage } from "../components";


function BaseField({
  label,
  value,
  onChange,
  error,
  id,
  type,
  ...inputProps
}: ExplicitInputFieldProps ): ReactElement {
  return (
    <StyledFormGroup>
      <Label id={id} label={label} />
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        {...inputProps}
      />

      {error && <ErrorMessage label={error} />}
    </StyledFormGroup>
  );
}

function TextField(props: InputFieldProps): ReactElement {
  return <BaseField {...props} type="text" />;
}

function TimeField(props: InputFieldProps): ReactElement {
  return <BaseField {...props} type="time" />;
}

function StartToEndInputField(props: {startProps: InputFieldProps, endProps: InputFieldProps}): ReactElement {
  return <StyledStartToEndInputField>
          <TimeField
            {...props.startProps}
          />
          <TimeField
            {...props.endProps}
          />
        </StyledStartToEndInputField>;
}

export {
  StartToEndInputField,
  TextField,
}
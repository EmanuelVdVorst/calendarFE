import styled from 'styled-components';

const StyledFormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const StyledStartToEndInputField = styled.div({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
});


export {
  StyledFormGroup,
  StyledStartToEndInputField,
}
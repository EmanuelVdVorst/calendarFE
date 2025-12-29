import styled from 'styled-components';


const StyledLabel = styled.label({
  fontSize: '14px',
  fontWeight: 500,
  color: '#000000',
});

const StyledErrorMessage = styled.div({
  color: '#FF3B30',
  fontSize: '13px',
  marginTop: '-8px',
});

const StyledInput = styled.input({
  padding: '10px 12px',
  fontSize: '14px',
  border: '1px solid #D1D1D6',
  borderRadius: '6px',
  outline: 'none',
  transition: 'border-color 0.2s ease',

  '&:focus': {
    borderColor: '#007AFF',
  },
});

export {
    StyledLabel,
    StyledErrorMessage,
    StyledInput
}

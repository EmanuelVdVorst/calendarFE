import styled from 'styled-components';

const StyledOverlay = styled.div({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  backdropFilter: 'blur(2px)',
});

const StyledModalContainer = styled.div({
  backgroundColor: '#FFFFFF',
  borderRadius: '12px',
  padding: '24px',
  maxWidth: '500px',
  width: '90%',
  boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
});

const StyledModalHeader = styled.h2({
  fontSize: '20px',
  fontWeight: 600,
  color: '#000000',
  margin: '0 0 20px 0',
});


export {
    StyledOverlay,
    StyledModalContainer,
    StyledModalHeader
} ;
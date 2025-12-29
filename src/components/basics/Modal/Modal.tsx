import { StyledOverlay, StyledModalContainer, StyledModalHeader } from './Modal.style';
import type { EventModalProps } from './Modal.type';



function Modal({ isOpen, title, onClose, children }: EventModalProps): JSX.Element | null {
  if (!isOpen ) {
    return null;
  }

  const handleOverlayClick = (): void => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };


  return (
    <StyledOverlay onClick={handleOverlayClick}>
     <StyledModalContainer onClick={handleModalClick}>
        {title && <StyledModalHeader>{title}</StyledModalHeader>}
        {children}
      </StyledModalContainer>
    </StyledOverlay>
  );
}

export { Modal };
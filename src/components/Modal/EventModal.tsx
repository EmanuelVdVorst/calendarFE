import styled from 'styled-components';
import type { TimeSlot, EventFormData } from '../../types/calendar.types';
import EventForm from './EventForm';

interface EventModalProps {
  isOpen: boolean;
  selectedSlot: TimeSlot | null;
  onClose: () => void;
  onSubmit: (formData: EventFormData) => void;
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

const ModalContainer = styled.div`
  background-color: #FFFFFF;
  border-radius: 12px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #000000;
  margin: 0 0 20px 0;
`;

function EventModal({ isOpen, selectedSlot, onClose, onSubmit }: EventModalProps): JSX.Element | null {
  if (!isOpen || !selectedSlot) {
    return null;
  }

  const handleOverlayClick = (): void => {
    onClose();
  };

  const handleModalClick = (e: React.MouseEvent): void => {
    e.stopPropagation();
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <ModalContainer onClick={handleModalClick}>
        <ModalHeader>New Event</ModalHeader>
        <EventForm
          initialDate={selectedSlot.date}
          initialHour={selectedSlot.hour}
          onSubmit={onSubmit}
          onCancel={onClose}
        />
      </ModalContainer>
    </Overlay>
  );
}

export default EventModal;

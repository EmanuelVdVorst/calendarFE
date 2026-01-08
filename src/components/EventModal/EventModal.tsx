import type { TimeSlot, EventFormData, CalendarEvent } from '../../types/calendar.types';
import EventForm from './EventForm';

import { Modal } from '../basics'

interface EventModalProps {
  isOpen: boolean;
  selectedSlot: TimeSlot | null;
  editingEvent: CalendarEvent | null;
  onClose: () => void;
  onSubmit: (formData: EventFormData) => void | Promise<void>;
  onDelete?: (eventId: string) => void | Promise<void>;
}

function EventModal({ isOpen, selectedSlot, editingEvent, onClose, onSubmit, onDelete }: EventModalProps): JSX.Element | null {
  if (!isOpen || (!selectedSlot && !editingEvent)) {
    return null;
  }

  const isEditMode = editingEvent !== null;

  return (
    <Modal isOpen={isOpen} title={isEditMode ? 'Edit Event' : 'New Event'} onClose={onClose}>
      <EventForm
          initialDate={selectedSlot?.date ?? editingEvent!.start}
          initialHour={selectedSlot?.hour ?? editingEvent!.start.getHours()}
          editingEvent={editingEvent}
          onSubmit={onSubmit}
          onCancel={onClose}
          onDelete={onDelete}
        />
    </Modal>
  );
}

export default EventModal;

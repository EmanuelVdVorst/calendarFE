import { useState, type ReactElement } from 'react';
import styled from 'styled-components';
import { WeekHeader } from '../../components/WeekHeader';
import { TimeGrid } from '../../components/TimeGrid';
import EventModal from '../../components/EventModal/EventModal';
import { useCalendar } from '../../hooks/useCalendar';
import { createEventFromFormData, getRandomEventColor } from '../../utils/event.utils';
import { colors } from '../../components/basics/Styles';
import type { TimeSlot as TimeSlotType, EventFormData, CalendarEvent } from '../../types/calendar.types';

const WeekViewContainer = styled.div({
  flex: 1,
  overflowY: 'auto',
  backgroundColor: colors.white,
});

export function WeekView(): ReactElement {
  const { addEvent, updateEvent, deleteEvent } = useCalendar();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotType | null>(null);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSlotClick = (date: Date, hour: number): void => {
    setSelectedSlot({ date, hour });
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEventClick = (event: CalendarEvent): void => {
    setEditingEvent(event);
    setSelectedSlot(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedSlot(null);
    setEditingEvent(null);
  };

  const handleSubmitEvent = (formData: EventFormData): void => {
    if (editingEvent) {
      // Update existing event
      const updatedEvent = createEventFromFormData(formData, editingEvent.color);
      updateEvent(editingEvent.id, updatedEvent);
    } else {
      // Create new event
      const color = getRandomEventColor();
      const newEvent = createEventFromFormData(formData, color);
      addEvent(newEvent);
    }
    handleCloseModal();
  };

  const handleDeleteEvent = (eventId: string): void => {
    deleteEvent(eventId);
    handleCloseModal();
  };

  return (
    <WeekViewContainer>
      <WeekHeader />
      <TimeGrid onSlotClick={handleSlotClick} onEventClick={handleEventClick} />
      <EventModal
        isOpen={isModalOpen}
        selectedSlot={selectedSlot}
        editingEvent={editingEvent}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEvent}
        onDelete={handleDeleteEvent}
      />
    </WeekViewContainer>
  );
}

export default WeekView;

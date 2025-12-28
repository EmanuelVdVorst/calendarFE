import { useState } from 'react';
import styled from 'styled-components';
import WeekHeader from './WeekHeader';
import TimeGrid from './TimeGrid';
import EventModal from '../Modal/EventModal';
import { useCalendar } from '../../hooks/useCalendar';
import { createEventFromFormData, getRandomEventColor } from '../../utils/event.utils';
import type { TimeSlot as TimeSlotType, EventFormData } from '../../types/calendar.types';

const WeekViewContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #FFFFFF;
`;

function WeekView(): JSX.Element {
  const { addEvent } = useCalendar();
  const [selectedSlot, setSelectedSlot] = useState<TimeSlotType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSlotClick = (date: Date, hour: number): void => {
    setSelectedSlot({ date, hour });
    setIsModalOpen(true);
  };

  const handleCloseModal = (): void => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  };

  const handleSubmitEvent = (formData: EventFormData): void => {
    const color = getRandomEventColor();
    const newEvent = createEventFromFormData(formData, color);
    addEvent(newEvent);
    handleCloseModal();
  };

  return (
    <WeekViewContainer>
      <WeekHeader />
      <TimeGrid onSlotClick={handleSlotClick} />
      <EventModal
        isOpen={isModalOpen}
        selectedSlot={selectedSlot}
        onClose={handleCloseModal}
        onSubmit={handleSubmitEvent}
      />
    </WeekViewContainer>
  );
}

export default WeekView;

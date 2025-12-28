import { useState, type FormEvent } from 'react';
import styled from 'styled-components';
import type { EventFormData } from '../../types/calendar.types';
import { validateEventTimes } from '../../utils/event.utils';

interface EventFormProps {
  initialDate: Date;
  initialHour: number;
  onSubmit: (formData: EventFormData) => void;
  onCancel: () => void;
}

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: 500;
  color: #000000;
`;

const Input = styled.input`
  padding: 10px 12px;
  font-size: 14px;
  border: 1px solid #D1D1D6;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007AFF;
  }
`;

const TimeInputGroup = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const ErrorMessage = styled.div`
  color: #FF3B30;
  font-size: 13px;
  margin-top: -8px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
`;

const CancelButton = styled(Button)`
  background-color: #F5F5F7;
  color: #000000;

  &:hover {
    background-color: #E8E8ED;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #007AFF;
  color: #FFFFFF;

  &:hover {
    background-color: #0051D5;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

function EventForm({ initialDate, initialHour, onSubmit, onCancel }: EventFormProps): JSX.Element {
  const defaultStartTime = `${initialHour.toString().padStart(2, '0')}:00`;
  const defaultEndTime = `${(initialHour + 1).toString().padStart(2, '0')}:00`;

  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setError(null);

    // Validate title
    if (!title.trim()) {
      setError('Event title is required');
      return;
    }

    // Validate times
    const validation = validateEventTimes(startTime, endTime);
    if (!validation.valid) {
      setError(validation.error ?? 'Invalid times');
      return;
    }

    onSubmit({
      title: title.trim(),
      startTime,
      endTime,
      date: initialDate,
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormGroup>
        <Label htmlFor="event-title">Event Title</Label>
        <Input
          id="event-title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter event title"
          autoFocus
        />
      </FormGroup>

      <TimeInputGroup>
        <FormGroup>
          <Label htmlFor="start-time">Start Time</Label>
          <Input
            id="start-time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label htmlFor="end-time">End Time</Label>
          <Input
            id="end-time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </FormGroup>
      </TimeInputGroup>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <ButtonGroup>
        <CancelButton type="button" onClick={onCancel}>
          Cancel
        </CancelButton>
        <SubmitButton type="submit">
          Create Event
        </SubmitButton>
      </ButtonGroup>
    </FormContainer>
  );
}

export default EventForm;

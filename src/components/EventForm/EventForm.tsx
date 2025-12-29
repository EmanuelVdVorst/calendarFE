import { useState } from 'react';
import type { EventFormData, CalendarEvent } from '../../types/calendar.types';
import { validateEventTimes } from '../../utils/event.utils';
// Import smart components with built-in logic
import { Form, TextField, StartToEndInputField, ButtonGroup } from '../basics';
import { CancelButton, SubmitButton, DeleteButton } from '../basics/buttons';
import { ErrorMessage } from '../basics/Form/components';

// ==================== EVENT-SPECIFIC PROPS ====================
interface EventFormProps {
  initialDate: Date;
  initialHour: number;
  editingEvent: CalendarEvent | null;
  onSubmit: (formData: EventFormData) => void;
  onCancel: () => void;
  onDelete?: (eventId: string) => void;
}


// ==================== EVENT FORM COMPONENT ====================
function EventForm({ initialDate, initialHour, editingEvent, onSubmit, onCancel, onDelete }: EventFormProps): JSX.Element {
  // Calculate default times
  const defaultStartTime = editingEvent
    ? `${editingEvent.start.getHours().toString().padStart(2, '0')}:${editingEvent.start.getMinutes().toString().padStart(2, '0')}`
    : `${initialHour.toString().padStart(2, '0')}:00`;
  const defaultEndTime = editingEvent
    ? `${editingEvent.end.getHours().toString().padStart(2, '0')}:${editingEvent.end.getMinutes().toString().padStart(2, '0')}`
    : `${(initialHour + 1).toString().padStart(2, '0')}:00`;

  // Event-specific state
  const [title, setTitle] = useState(editingEvent?.title ?? '');
  const [startTime, setStartTime] = useState(defaultStartTime);
  const [endTime, setEndTime] = useState(defaultEndTime);
  const [error, setError] = useState<string | null>(null);

  // Event-specific validation and submission logic
  const handleSubmit = (): void => {
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

  const handleDelete = (): void => {
    if (editingEvent && onDelete) {
      if (window.confirm(`Are you sure you want to delete "${editingEvent.title}"?`)) {
        onDelete(editingEvent.id);
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* TextField handles Label + Input + Error in one component */}
      <TextField
        id="event-title"
        label="Event Title"
        value={title}
        onChange={setTitle}
        placeholder="Enter event title"
        autoFocus
      />

      {/* TimeInputGroup with two TimeField components */}
      <StartToEndInputField   
      startProps={{
        id: 'start-time',
        label: 'Start Time',
        value: startTime,
        onChange: setStartTime,
      }}
      endProps={{
        id: 'end-time',
        label: 'End Time',
        value: endTime,
        onChange: setEndTime,
      }}/>

      {/* Show validation errors */}
      {error && <ErrorMessage label={error} />}

      <ButtonGroup>
        {editingEvent && onDelete && (<DeleteButton onClick={handleDelete} />)}
        <CancelButton onClick={onCancel} />
        <SubmitButton label={editingEvent ? 'Save Changes' : 'Create Event'} />
      </ButtonGroup>
    </Form>
  );
}

export default EventForm;

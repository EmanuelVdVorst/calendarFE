import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithoutProvider } from '../../../../test/test-utils';
import { TextField, StartToEndInputField } from './InputFields';

describe('TextField', () => {
  const defaultProps = {
    id: 'test-field',
    label: 'Test Label',
    value: '',
    onChange: vi.fn(),
  };

  it('renders label and input', () => {
    renderWithoutProvider(<TextField {...defaultProps} />);

    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    renderWithoutProvider(<TextField {...defaultProps} value="test value" />);

    expect(screen.getByRole('textbox')).toHaveValue('test value');
  });

  it('calls onChange when input value changes', async () => {
    const onChange = vi.fn();
    const { user } = renderWithoutProvider(
      <TextField {...defaultProps} onChange={onChange} />
    );

    await user.type(screen.getByRole('textbox'), 'a');

    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('displays error message when provided', () => {
    renderWithoutProvider(<TextField {...defaultProps} error="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not display error message when not provided', () => {
    renderWithoutProvider(<TextField {...defaultProps} />);

    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('has correct input type', () => {
    renderWithoutProvider(<TextField {...defaultProps} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });
});

describe('StartToEndInputField', () => {
  const defaultProps = {
    startProps: {
      id: 'start-time',
      label: 'Start Time',
      value: '',
      onChange: vi.fn(),
    },
    endProps: {
      id: 'end-time',
      label: 'End Time',
      value: '',
      onChange: vi.fn(),
    },
  };

  it('renders both start and end time fields', () => {
    renderWithoutProvider(<StartToEndInputField {...defaultProps} />);

    expect(screen.getByLabelText('Start Time')).toBeInTheDocument();
    expect(screen.getByLabelText('End Time')).toBeInTheDocument();
  });

  it('displays values for both fields', () => {
    renderWithoutProvider(
      <StartToEndInputField
        startProps={{ ...defaultProps.startProps, value: '09:00' }}
        endProps={{ ...defaultProps.endProps, value: '17:00' }}
      />
    );

    expect(screen.getByLabelText('Start Time')).toHaveValue('09:00');
    expect(screen.getByLabelText('End Time')).toHaveValue('17:00');
  });

  it('calls respective onChange handlers', async () => {
    const onStartChange = vi.fn();
    const onEndChange = vi.fn();
    const { user } = renderWithoutProvider(
      <StartToEndInputField
        startProps={{ ...defaultProps.startProps, onChange: onStartChange }}
        endProps={{ ...defaultProps.endProps, onChange: onEndChange }}
      />
    );

    await user.type(screen.getByLabelText('Start Time'), '09:00');
    await user.type(screen.getByLabelText('End Time'), '17:00');

    expect(onStartChange).toHaveBeenCalled();
    expect(onEndChange).toHaveBeenCalled();
  });

  it('displays errors for both fields when provided', () => {
    renderWithoutProvider(
      <StartToEndInputField
        startProps={{ ...defaultProps.startProps, error: 'Start time required' }}
        endProps={{ ...defaultProps.endProps, error: 'End time required' }}
      />
    );

    expect(screen.getByText('Start time required')).toBeInTheDocument();
    expect(screen.getByText('End time required')).toBeInTheDocument();
  });
});

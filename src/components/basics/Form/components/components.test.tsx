import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithoutProvider } from '../../../../test/test-utils';
import { Label } from './Label';
import { Input } from './Input';
import { ErrorMessage } from './ErrorMessage';

describe('Label', () => {
  it('renders the label text', () => {
    renderWithoutProvider(<Label id="test-id" label="Test Label" />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('associates with the correct input via htmlFor', () => {
    renderWithoutProvider(<Label id="test-id" label="Test Label" />);

    const label = screen.getByText('Test Label');
    expect(label).toHaveAttribute('for', 'test-id');
  });
});

describe('Input', () => {
  const defaultProps = {
    id: 'test-input',
    value: '',
    onChange: vi.fn(),
  };

  it('renders an input element', () => {
    renderWithoutProvider(<Input {...defaultProps} />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('displays the current value', () => {
    renderWithoutProvider(<Input {...defaultProps} value="test value" />);

    expect(screen.getByRole('textbox')).toHaveValue('test value');
  });

  it('calls onChange with the new value when input changes', async () => {
    const onChange = vi.fn();
    const { user } = renderWithoutProvider(
      <Input {...defaultProps} onChange={onChange} />
    );

    await user.type(screen.getByRole('textbox'), 'a');

    expect(onChange).toHaveBeenCalledWith('a');
  });

  it('has the correct id attribute', () => {
    renderWithoutProvider(<Input {...defaultProps} />);

    expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-input');
  });

  it('passes through additional input props', () => {
    renderWithoutProvider(
      <Input {...defaultProps} placeholder="Enter text" disabled />
    );

    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Enter text');
    expect(input).toBeDisabled();
  });
});

describe('ErrorMessage', () => {
  it('renders the error message', () => {
    renderWithoutProvider(<ErrorMessage label="This field is required" />);

    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('displays different error messages', () => {
    renderWithoutProvider(<ErrorMessage label="Invalid email format" />);

    expect(screen.getByText('Invalid email format')).toBeInTheDocument();
  });
});

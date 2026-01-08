import { type ReactNode } from 'react';

interface FormProps {
  onSubmit: () => void | Promise<void>;
  children: ReactNode;
  className?: string;
}

export type {
    FormProps
}
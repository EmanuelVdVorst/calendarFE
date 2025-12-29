import type { ReactNode } from "react";

interface EventModalProps {
  isOpen: boolean;
  title?: string;
  onClose: () => void;
  children: ReactNode;
}


export type {
    EventModalProps
}
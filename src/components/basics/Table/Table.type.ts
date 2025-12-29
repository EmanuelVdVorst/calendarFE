import type { ReactNode } from 'react';

type SortDirection = 'asc' | 'desc' | null;

interface ColumnDefinition<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
}

interface SortState {
  key: string;
  direction: SortDirection;
}

interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
}

interface TableProps<T> {
  columns: ColumnDefinition<T>[];
  data: T[];
  getRowKey: (row: T, index: number) => string | number;
  onSort?: (sortState: SortState) => void;
  sortState?: SortState;
  pagination?: PaginationState;
  onPageChange?: (page: number) => void;
  className?: string;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface TableHeaderProps {
  label: string;
  sortable: boolean;
  isActive: boolean;
  direction: SortDirection;
  onClick: () => void;
}

export type {
  ColumnDefinition,
  SortDirection,
  SortState,
  PaginationState,
  TableProps,
  PaginationProps,
  TableHeaderProps,
};

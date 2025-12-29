import type { ReactElement } from 'react';

import {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
  StyledTableRow,
  StyledTableHeader,
  StyledTableCell,
  SortIndicator,
  EmptyState,
} from './Table.style';
import type { TableProps, TableHeaderProps } from './Table.type';

function TableHeaderCell({
  label,
  sortable,
  isActive,
  direction,
  onClick,
}: TableHeaderProps): ReactElement {
  return (
    <StyledTableHeader
      $sortable={sortable}
      $isActive={isActive}
      onClick={sortable ? onClick : undefined}
    >
      {label}
      {sortable && <SortIndicator $direction={direction}>▲</SortIndicator>}
    </StyledTableHeader>
  );
}

function Table<T extends Record<string, unknown>>({
  columns,
  data,
  getRowKey,
  onSort,
  sortState,
  className,
}: TableProps<T>): ReactElement {
  const handleSort = (columnKey: string): void => {
    if (!onSort) {
      return;
    }

    let newDirection: 'asc' | 'desc' | null = 'asc';

    if (sortState?.key === columnKey) {
      if (sortState.direction === 'asc') {
        newDirection = 'desc';
      } else if (sortState.direction === 'desc') {
        newDirection = null;
      } else {
        newDirection = 'asc';
      }
    }

    onSort({
      key: columnKey,
      direction: newDirection,
    });
  };

  const getColumnValue = (row: T, columnKey: string): unknown => {
    return row[columnKey];
  };

  return (
    <StyledTableContainer className={className}>
      <StyledTable>
        <StyledTableHead>
          <StyledTableRow>
            {columns.map((column) => (
              <TableHeaderCell
                key={column.key}
                label={column.label}
                sortable={column.sortable ?? false}
                isActive={sortState?.key === column.key}
                direction={
                  sortState?.key === column.key ? sortState.direction : null
                }
                onClick={() => handleSort(column.key)}
              />
            ))}
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>
          {data.length === 0 ? (
            <tr>
              <StyledTableCell colSpan={columns.length}>
                <EmptyState>No data available</EmptyState>
              </StyledTableCell>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <StyledTableRow key={getRowKey(row, rowIndex)}>
                {columns.map((column) => (
                  <StyledTableCell key={column.key}>
                    {column.render
                      ? column.render(row)
                      : String(getColumnValue(row, column.key) ?? '')}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))
          )}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
}

export { Table };

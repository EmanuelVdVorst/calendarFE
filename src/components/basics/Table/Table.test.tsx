import { describe, it, expect, vi } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithoutProvider } from '../../../test/test-utils';
import { Table } from './Table';
import type { ColumnDefinition } from './Table.type';

interface TestData {
  [key: string]: unknown;
  id: number;
  name: string;
  email: string;
}

describe('Table', () => {
  const columns: ColumnDefinition<TestData>[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email' },
  ];

  const data: TestData[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
  ];

  const getRowKey = (row: TestData): number => row.id;

  it('renders table headers', () => {
    renderWithoutProvider(
      <Table columns={columns} data={data} getRowKey={getRowKey} />
    );

    expect(screen.getByText('ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
  });

  it('renders table data', () => {
    renderWithoutProvider(
      <Table columns={columns} data={data} getRowKey={getRowKey} />
    );

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
  });

  it('renders empty state when no data', () => {
    renderWithoutProvider(
      <Table columns={columns} data={[]} getRowKey={getRowKey} />
    );

    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('calls onSort when sortable header is clicked', async () => {
    const onSort = vi.fn();
    const { user } = renderWithoutProvider(
      <Table columns={columns} data={data} getRowKey={getRowKey} onSort={onSort} />
    );

    await user.click(screen.getByText('Name'));

    expect(onSort).toHaveBeenCalledWith({ key: 'name', direction: 'asc' });
  });

  it('cycles sort direction on subsequent clicks', async () => {
    const onSort = vi.fn();
    const { user } = renderWithoutProvider(
      <Table
        columns={columns}
        data={data}
        getRowKey={getRowKey}
        onSort={onSort}
        sortState={{ key: 'name', direction: 'asc' }}
      />
    );

    await user.click(screen.getByText('Name'));

    expect(onSort).toHaveBeenCalledWith({ key: 'name', direction: 'desc' });
  });

  it('does not call onSort for non-sortable columns', async () => {
    const onSort = vi.fn();
    const { user } = renderWithoutProvider(
      <Table columns={columns} data={data} getRowKey={getRowKey} onSort={onSort} />
    );

    await user.click(screen.getByText('Email'));

    expect(onSort).not.toHaveBeenCalled();
  });

  it('renders custom cell content via render function', () => {
    const columnsWithRender: ColumnDefinition<TestData>[] = [
      { key: 'id', label: 'ID' },
      {
        key: 'name',
        label: 'Name',
        render: (row) => <strong data-testid="bold-name">{row.name}</strong>,
      },
    ];

    renderWithoutProvider(
      <Table columns={columnsWithRender} data={data} getRowKey={getRowKey} />
    );

    const boldNames = screen.getAllByTestId('bold-name');
    expect(boldNames).toHaveLength(2);
    expect(boldNames[0]).toHaveTextContent('John Doe');
  });

  it('applies custom className', () => {
    const { container } = renderWithoutProvider(
      <Table
        columns={columns}
        data={data}
        getRowKey={getRowKey}
        className="custom-table"
      />
    );

    expect(container.querySelector('.custom-table')).toBeInTheDocument();
  });
});

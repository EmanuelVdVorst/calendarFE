import { useState, type ReactElement } from 'react';

import { Table, Pagination, type ColumnDefinition, type SortState } from './index';

interface User extends Record<string, unknown> {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
}

function TableExample(): ReactElement {
  const [sortState, setSortState] = useState<SortState>({
    key: 'name',
    direction: 'asc',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const users: User[] = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'active' },
    { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'User', status: 'inactive' },
    { id: 4, name: 'Diana Prince', email: 'diana@example.com', role: 'Manager', status: 'active' },
    { id: 5, name: 'Ethan Hunt', email: 'ethan@example.com', role: 'User', status: 'active' },
  ];

  const columns: ColumnDefinition<User>[] = [
    {
      key: 'name',
      label: 'Name',
      sortable: true,
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
    },
    {
      key: 'role',
      label: 'Role',
      sortable: true,
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (user) => (
        <span style={{ color: user.status === 'active' ? '#00AA00' : '#AA0000' }}>
          {user.status.toUpperCase()}
        </span>
      ),
    },
  ];

  const handleSort = (newSortState: SortState): void => {
    setSortState(newSortState);
  };

  const sortedUsers = [...users].sort((a, b) => {
    if (!sortState.direction) {
      return 0;
    }

    const aValue = String(a[sortState.key as keyof User]);
    const bValue = String(b[sortState.key as keyof User]);

    if (sortState.direction === 'asc') {
      return aValue.localeCompare(bValue);
    }
    return bValue.localeCompare(aValue);
  });

  return (
    <div>
      <h2>Table Example</h2>
      <Table
        columns={columns}
        data={sortedUsers}
        getRowKey={(user) => user.id}
        sortState={sortState}
        onSort={handleSort}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={5}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}

export default TableExample;

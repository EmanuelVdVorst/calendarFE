import styled from 'styled-components';

const StyledTableContainer = styled.div({
  width: '100%',
  overflowX: 'auto',
  border: '1px solid #E8E8ED',
  borderRadius: '8px',
  backgroundColor: '#FFFFFF',
});

const StyledTable = styled.table({
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '14px',
});

const StyledTableHead = styled.thead({
  backgroundColor: '#F5F5F7',
  borderBottom: '2px solid #E8E8ED',
});

const StyledTableBody = styled.tbody({
  '& tr:nth-child(even)': {
    backgroundColor: '#FAFAFA',
  },
  '& tr:hover': {
    backgroundColor: '#F0F0F5',
  },
});

const StyledTableRow = styled.tr({
  borderBottom: '1px solid #E8E8ED',
  transition: 'background-color 0.2s ease',
});

const StyledTableHeader = styled.th<{ $sortable: boolean; $isActive: boolean }>((props) => ({
  padding: '12px 16px',
  textAlign: 'left',
  fontWeight: 600,
  color: props.$isActive ? '#007AFF' : '#000000',
  cursor: props.$sortable ? 'pointer' : 'default',
  userSelect: 'none',
  position: 'relative',
  transition: 'color 0.2s ease',

  '&:hover': props.$sortable ? {
    color: '#007AFF',
    backgroundColor: '#E8E8ED',
  } : {},
}));

const StyledTableCell = styled.td({
  padding: '12px 16px',
  color: '#333333',
});

const SortIndicator = styled.span<{ $direction: 'asc' | 'desc' | null }>((props) => ({
  display: 'inline-block',
  marginLeft: '8px',
  fontSize: '10px',
  color: props.$direction ? '#007AFF' : '#CCCCCC',
  transition: 'transform 0.2s ease',
  transform: props.$direction === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)',
}));

const PaginationContainer = styled.div({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '16px',
  borderTop: '1px solid #E8E8ED',
  backgroundColor: '#F5F5F7',
});

const PaginationInfo = styled.span({
  fontSize: '14px',
  color: '#666666',
});

const PaginationControls = styled.div({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
});

const PageButton = styled.button<{ $isActive?: boolean; $disabled?: boolean }>((props) => {
  const getColor = (): string => {
    if (props.$isActive) {
      return '#FFFFFF';
    }
    if (props.$disabled) {
      return '#CCCCCC';
    }
    return '#000000';
  };

  return {
    padding: '6px 12px',
    fontSize: '14px',
    fontWeight: 500,
    borderRadius: '4px',
    cursor: props.$disabled ? 'not-allowed' : 'pointer',
    border: '1px solid #E8E8ED',
    backgroundColor: props.$isActive ? '#007AFF' : '#FFFFFF',
    color: getColor(),
    transition: 'all 0.2s ease',
    opacity: props.$disabled ? 0.5 : 1,

    '&:hover': !props.$disabled
      ? {
          backgroundColor: props.$isActive ? '#0051D5' : '#F5F5F7',
        }
      : {},
  };
});

const PageNumbers = styled.div({
  display: 'flex',
  gap: '4px',
});

const EmptyState = styled.div({
  padding: '48px 16px',
  textAlign: 'center',
  color: '#999999',
  fontSize: '14px',
});

export {
  StyledTableContainer,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
  StyledTableRow,
  StyledTableHeader,
  StyledTableCell,
  SortIndicator,
  PaginationContainer,
  PaginationInfo,
  PaginationControls,
  PageButton,
  PageNumbers,
  EmptyState,
};

import type { ReactElement } from 'react';

import {
  PaginationContainer,
  PaginationInfo,
  PaginationControls,
  PageButton,
  PageNumbers,
} from './Table.style';
import type { PaginationProps } from './Table.type';

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps): ReactElement {
  const getPageNumbers = (): number[] => {
    const pages: number[] = [];
    const maxPagesToShow = 5;

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push(-1);
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push(-1);
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push(-1);
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const handlePrevious = (): void => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = (): void => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <PaginationContainer>
      <PaginationInfo>
        Page {currentPage} of {totalPages}
      </PaginationInfo>
      <PaginationControls>
        <PageButton
          onClick={handlePrevious}
          $disabled={currentPage === 1}
          disabled={currentPage === 1}
        >
          Previous
        </PageButton>
        <PageNumbers>
          {pageNumbers.map((page, index) => {
            if (page === -1) {
              const prevPage = index > 0 ? pageNumbers[index - 1] : 0;
              return (
                <span
                  key={`ellipsis-after-${prevPage}`}
                  style={{ padding: '0 8px' }}
                >
                  ...
                </span>
              );
            }
            return (
              <PageButton
                key={page}
                onClick={() => onPageChange(page)}
                $isActive={currentPage === page}
              >
                {page}
              </PageButton>
            );
          })}
        </PageNumbers>
        <PageButton
          onClick={handleNext}
          $disabled={currentPage === totalPages}
          disabled={currentPage === totalPages}
        >
          Next
        </PageButton>
      </PaginationControls>
    </PaginationContainer>
  );
}

export { Pagination };

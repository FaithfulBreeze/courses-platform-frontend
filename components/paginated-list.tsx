'use client';

import { Fragment } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from './ui/pagination';
import { getPaginationRange } from '@/common/utils/getPaginationRange';

interface PaginatedListProps<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  renderItem: (item: T, index: number) => React.ReactNode;
  isLoading?: boolean;
  loadingSkeletonCount?: number;
}

export function PaginatedList<T>({
  items,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  renderItem,
  isLoading = false,
  loadingSkeletonCount = pageSize,
}: PaginatedListProps<T>) {
  const totalPages = Math.ceil(totalCount / pageSize);

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="space-y-6">
      <ul className="space-y-4 sm:space-y-6">
        {isLoading
          ? Array.from({ length: loadingSkeletonCount }, (_, i) => (
              <div
                key={i}
                className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg h-16 sm:h-20"
              />
            ))
          : items.map((item, i) => <Fragment key={i}>{renderItem(item, i)}</Fragment>)}
      </ul>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious onClick={handlePrev} />
            </PaginationItem>

            {getPaginationRange({
              currentPage,
              totalPages,
              siblingCount: 1,
            }).map((item, index) => (
              <PaginationItem key={index}>
                {item === 'ellipsis' ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    isActive={currentPage === item}
                    onClick={() => onPageChange(item)}
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext onClick={handleNext} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

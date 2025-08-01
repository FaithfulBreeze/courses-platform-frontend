export function getPaginationRange({
  currentPage,
  totalPages,
  siblingCount = 1, // number of pages to show on either side of current page
}: {
  currentPage: number;
  totalPages: number;
  siblingCount?: number;
}): (number | 'ellipsis')[] {
  const totalPageNumbers = siblingCount * 2 + 5; // first, last, current, and two ellipses

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const range: (number | 'ellipsis')[] = [];

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItems = Array.from({ length: 3 + 2 * siblingCount }, (_, i) => i + 1);
    return [...leftItems, 'ellipsis', totalPages];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItems = Array.from(
      { length: 3 + 2 * siblingCount },
      (_, i) => totalPages - (3 + 2 * siblingCount) + i + 1,
    );
    return [1, 'ellipsis', ...rightItems];
  }

  if (showLeftEllipsis && showRightEllipsis) {
    const middleItems = Array.from({ length: 2 * siblingCount + 1 }, (_, i) => leftSibling + i);
    return [1, 'ellipsis', ...middleItems, 'ellipsis', totalPages];
  }

  return [];
}

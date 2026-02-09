import { useMemo } from "react";

interface UsePaginationProps<T> {
  items: T[];
  page: number;
  limit: number;
}

export const usePagination = <T,>({ items, page, limit }: UsePaginationProps<T>) => {
  const totalPages = Math.ceil(items.length / limit);

  const paginatedItems = useMemo(() => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return items.slice(startIndex, endIndex);
  }, [items, page, limit]);

  return { paginatedItems, totalPages };
};

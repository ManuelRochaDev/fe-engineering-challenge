import { Button } from "./Button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  const isFirstPage = currentPage === 1 || isLoading || totalPages === 0;
  const isLastPage = currentPage === totalPages || isLoading || totalPages === 0;

  return (
    <div className="flex items-center gap-4">
      <Button
        variant={isFirstPage ? "secondary" : "primary"}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={isFirstPage}
      >
        ←
      </Button>
      <span className="text-gray-700">
        Page {currentPage} of {totalPages || 1}
      </span>
      <Button
        variant={isLastPage ? "secondary" : "primary"}
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={isLastPage}
      >
        →
      </Button>
    </div>
  );
};

export { Pagination };

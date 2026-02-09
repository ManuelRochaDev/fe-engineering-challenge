import { Button } from "./Button";

interface BulkActionsProps {
  selectedCount: number;
  onCatch?: () => void;
  onRelease?: () => void;
  onClear: () => void;
}

const BulkActions: React.FC<BulkActionsProps> = ({
  selectedCount,
  onCatch,
  onRelease,
  onClear,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex gap-2 mb-4">
      {onCatch && (
        <Button variant="success" onClick={onCatch}>
          Catch Selected ({selectedCount})
        </Button>
      )}
      {onRelease && (
        <Button variant="danger" onClick={onRelease}>
          Release Selected ({selectedCount})
        </Button>
      )}
      <Button variant="secondary" onClick={onClear}>
        Clear Selection
      </Button>
    </div>
  );
};

export { BulkActions };

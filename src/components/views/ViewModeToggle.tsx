import { Button } from "../Button";

interface ViewModeToggleProps {
  viewMode: "grid" | "table";
  onViewModeChange: (mode: "grid" | "table") => void;
}

const ViewModeToggle: React.FC<ViewModeToggleProps> = ({
  viewMode,
  onViewModeChange,
}) => {
  const getVariant = (mode: "grid" | "table") =>
    viewMode === mode ? "primary" : "secondary";
  return (
    <div className="sm:absolute sm:right-0 flex gap-2 justify-center">
      <Button
        variant={getVariant("table")}
        onClick={() => onViewModeChange("table")}
      >
        Table
      </Button>
      <Button
        variant={getVariant("grid")}
        onClick={() => onViewModeChange("grid")}
      >
        Grid
      </Button>
    </div>
  );
};

export { ViewModeToggle };

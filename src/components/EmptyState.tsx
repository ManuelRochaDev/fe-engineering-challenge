interface EmptyStateProps {
  message: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ message }) => {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="text-xl font-semibold text-gray-600">{message}</div>
    </div>
  );
};

export { EmptyState };

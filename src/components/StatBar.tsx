interface StatBarProps {
  label: string;
  value: number;
  maxValue?: number;
}

const StatBar: React.FC<StatBarProps> = ({ label, value, maxValue = 255 }) => {
  const percentage = (value / maxValue) * 100;
  
  return (
    <div className="mb-2">
      <div className="flex justify-between space-x-8 text-sm mb-1">
        <span>{label}</span>
        <span>{value}</span>
      </div>
      <div className="w-full bg-gray-400 rounded-full h-2">
        <div
          className="bg-yellow-300 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export { StatBar };
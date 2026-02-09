import { getTypeColor } from "../utils/type-color-mapper";

interface TypeTagProps {
  type: string;
}

const TypeTag: React.FC<TypeTagProps> = ({ type }) => {
  return (
    <span
      className={`px-2 py-1 text-xs rounded ${getTypeColor(type)}`}
    >
      {type}
    </span>
  );
};

export { TypeTag };

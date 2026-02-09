import { Link, useNavigate } from "react-router";
import { Button } from "./Button";

const Header: React.FC<{}> = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-red-500 text-white sm:h-20 h-16 flex items-center px-6 justify-between w-full">
      <Link to="/">
        <h1 className="text-3xl font-bold">Pokédex Tracker</h1>
      </Link>
      <Button variant="secondary" onClick={() => navigate("/pokedex")}>
        My Pokédex
      </Button>
    </header>
  );
};

export { Header };

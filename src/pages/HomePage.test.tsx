import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import HomePage from "./HomePage";
import * as useFetchPokemonDetailsModule from "../hooks/useFetchPokemonDetails";
import * as useFilteredPokemonListModule from "../hooks/useFilteredPokemonList";
import { usePokedex } from "../contexts/PokedexContext";

vi.mock("../hooks/useFetchPokemonDetails");
vi.mock("../hooks/useFilteredPokemonList");
vi.mock("../contexts/PokedexContext");

describe("HomePage", () => {
  const mockPokemonWithDetails = [
    {
      pokemon: { name: "pikachu" },
      details: {
        id: 25,
        name: "pikachu",
        height: 4,
        weight: 60,
        sprites: { front_default: "" },
        types: [{ type: { name: "electric" } }],
        stats: [],
      },
    },
    {
      pokemon: { name: "charizard" },
      details: {
        id: 6,
        name: "charizard",
        height: 17,
        weight: 905,
        sprites: { front_default: "" },
        types: [{ type: { name: "fire" } }],
        stats: [],
      },
    },
  ] as any;

  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(
      useFetchPokemonDetailsModule,
      "useFetchPokemonDetails",
    ).mockReturnValue({
      pokemonWithDetails: mockPokemonWithDetails,
      isLoading: false,
      isOffline: false,
      totalCount: 100,
    });

    vi.spyOn(
      useFilteredPokemonListModule,
      "useFilteredPokemonList",
    ).mockReturnValue({
      filters: {
        searchName: "",
        filterType: "",
        sortBy: "none",
        sortOrder: "asc",
      },
      setFilters: vi.fn(),
      filteredPokemons: mockPokemonWithDetails,
    });

    vi.mocked(usePokedex).mockReturnValue({
      addPokemon: vi.fn(),
      removePokemon: vi.fn(),
      isPokemonInPokedex: vi.fn().mockReturnValue(false),
      pokedex: [],
      getPokemonData: vi.fn(),
      exportPokedexToCSV: vi.fn(),
      sharePokemon: vi.fn(),
    } as any);
  });

  it("renders without crashing", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );
    expect(screen.getByRole("table")).toBeInTheDocument();
  });

  it("hides the table when the grid button is clicked", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const gridButton = screen.getByRole("button", { name: "Grid" });
    await user.click(gridButton);

    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });

  it("displays bulk action buttons when pokemon are selected", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    //select the first pokemon by clicking the checkbox
    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);

    expect(screen.getByText("Catch Selected (1)")).toBeInTheDocument();
    expect(screen.getByText("Release Selected (1)")).toBeInTheDocument();
    expect(screen.getByText("Clear Selection")).toBeInTheDocument();
  });

  it("calls addPokemon when catching selected pokemon", async () => {
    const user = userEvent.setup();
    const mockUsePokedex = vi.mocked(usePokedex);

    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    );

    const checkboxes = screen.getAllByRole("checkbox");
    await user.click(checkboxes[0]);

    const catchButton = screen.getByText("Catch Selected (1)");
    await user.click(catchButton);

    const addPokemonMock = mockUsePokedex.mock.results[0].value.addPokemon;
    expect(addPokemonMock).toHaveBeenCalledWith("pikachu");
  });
});

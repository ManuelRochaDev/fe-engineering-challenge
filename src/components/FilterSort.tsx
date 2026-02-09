import { TypeEnum } from "../constants/type";
import { Button } from "./Button";
import { useState } from "react";
import type { FilterOptions } from "../interfaces/FilterOptions";

interface FilterSortProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  onExport?: () => void;
}

const FilterSort: React.FC<FilterSortProps> = ({ filters, onFilterChange, onExport }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: keyof FilterOptions, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value,
    };
    onFilterChange(newFilters);
  };

  const pokemonTypes = Object.values(TypeEnum);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <button
        className="w-full flex items-center justify-between font-semibold text-lg mb-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <span>Filters</span>
        <span className="text-xl">{isExpanded ? "▲" : "▼"}</span>
      </button>

      <div className={isExpanded ? "block" : "hidden"}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* search by name */}
        <div>
          <label htmlFor="searchName" className="block text-sm font-semibold mb-2">Search by Name</label>
          <input
            id="searchName"
            type="text"
            placeholder="Enter Pokémon name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleFilterChange("searchName", e.target.value)}
            value={filters.searchName}
          />
        </div>

        {/* filter by type */}
        <div>
          <label htmlFor="filterType" className="block text-sm font-semibold mb-2">Filter by Type</label>
          <select
            id="filterType"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleFilterChange("filterType", e.target.value)}
            value={filters.filterType}
          >
            <option value="">All Types</option>
            {pokemonTypes.map((type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </option>
            ))}
          </select>
        </div>

        {/* sort by */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-semibold mb-2">Sort By</label>
          <select
            id="sortBy"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleFilterChange("sortBy", e.target.value)}
            value={filters.sortBy}
          >
            <option value="none">Default</option>
            <option value="name">Name</option>
            <option value="height">Height</option>
            <option value="timestamp">Caught Date</option>
          </select>
        </div>

        {/* sort order */}
        <div>
          <label htmlFor="sortOrder" className="block text-sm font-semibold mb-2">Sort Order</label>
          <select
            id="sortOrder"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            onChange={(e) => handleFilterChange("sortOrder", e.target.value)}
            value={filters.sortOrder}
            disabled={filters.sortBy === "none"}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
      {onExport && (
        <div className="mt-4 flex justify-end">
          <Button variant="primary" onClick={onExport}>
            Export CSV
          </Button>
        </div>
      )}
      </div>
    </div>
  );
};

export { FilterSort };

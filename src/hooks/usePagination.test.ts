import { describe, it, expect } from "vitest";
import { renderHook } from "@testing-library/react";
import { usePagination } from "./usePagination";

describe("usePagination", () => {
  const mockItems = [
    { id: 1, name: "item1" },
    { id: 2, name: "item2" },
    { id: 3, name: "item3" },
    { id: 4, name: "item4" },
    { id: 5, name: "item5" },
  ];

  it("paginates items correctly", () => {
    const { result } = renderHook(() =>
      usePagination({ items: mockItems, page: 1, limit: 2 }),
    );

    expect(result.current.paginatedItems).toHaveLength(2);
    expect(result.current.paginatedItems[0].name).toBe("item1");
    expect(result.current.paginatedItems[1].name).toBe("item2");
    expect(result.current.totalPages).toBe(3);
  });

  it("handles empty array", () => {
    const { result } = renderHook(() =>
      usePagination({ items: [], page: 1, limit: 10 }),
    );

    expect(result.current.paginatedItems).toHaveLength(0);
    expect(result.current.totalPages).toBe(0);
  });
});

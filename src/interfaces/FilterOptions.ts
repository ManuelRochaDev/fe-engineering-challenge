export interface FilterOptions {
  searchName: string;
  filterType: string;
  sortBy: "name" | "height" | "timestamp" | "none";
  sortOrder: "asc" | "desc";
}

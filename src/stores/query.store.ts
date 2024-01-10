import { create } from "zustand";

export interface QueryStore {
  query: string;
  setQuery: (filters: string) => void;
}
export const useQueryStore = create<QueryStore>()((set) => ({
  query: "",
  setQuery: (query) => set({ query }),
}));

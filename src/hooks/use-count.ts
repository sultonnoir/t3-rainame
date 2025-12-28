import { create } from "zustand";

interface CountStore {
  count: number;
  increment: (max: number) => void; // Parameter max untuk increment
  decrement: (min: number) => void; // Parameter min untuk decrement
  reset: () => void;
  setCount: (count: number) => void;
}

export const useCount = create<CountStore>((set) => ({
  count: 1,
  increment: (max) =>
    set((state) => ({
      count: Math.min(state.count + 1, max), // Pastikan tidak melebihi max
    })),
  decrement: (min) =>
    set((state) => ({
      count: Math.max(state.count - 1, min), // Pastikan tidak kurang dari min
    })),
  reset: () => set({ count: 1 }),
  setCount: (count) => set({ count }),
}));

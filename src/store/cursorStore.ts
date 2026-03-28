import { create } from "zustand";

type CursorState = {
  variant: "default" | "hover" | "card";
  setVariant: (variant: "default" | "hover" | "card") => void;
};

export const useCursorStore = create<CursorState>((set) => ({
  variant: "default",
  setVariant: (variant) => set({ variant }),
}));
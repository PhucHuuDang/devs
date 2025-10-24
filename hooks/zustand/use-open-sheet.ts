import { create } from "zustand";
import createSelectors from "../auto-selector";

interface UseOpenSheetProps {
  isOpen: boolean;
  onOpen: (value: boolean) => void;
  onClose: () => void;
}

export const useOpenSheet = create<UseOpenSheetProps>((set) => ({
  isOpen: false,
  onOpen: (value) => set({ isOpen: value }),
  onClose: () => set({ isOpen: false }),
}));

export const useOpenSheetSelectors = createSelectors(useOpenSheet);

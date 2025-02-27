import { create } from "zustand";

interface ConnectorStoreType {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export const useConnectorStore = create<ConnectorStoreType>((set) => ({
  isOpen: false,
  setIsOpen: (value) => set({ isOpen: value }),
}));

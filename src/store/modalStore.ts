import { create } from "zustand";

interface Modal {
  modalState: boolean;
  handleModalState: () => void;
}

export const useModal = create<Modal>((set) => ({
  modalState: false,
  handleModalState: () => set((state) => ({ modalState: !state.modalState })),
}));

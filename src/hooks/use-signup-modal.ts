import { create } from "zustand";

interface SignupModalState {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

export const useSignupModal = create<SignupModalState>((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
}));

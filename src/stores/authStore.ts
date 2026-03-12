import { create } from "zustand";

interface AuthStore {
  token: string | null;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  token: null,
  login: () => set({ token: "tempToken" }),
  logout: () => set({ token: null }),
}));

export default useAuthStore;

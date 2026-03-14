import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  showLoginModal: boolean;
  login: () => void;
  logout: () => void;
  returnPath: string;
  openLoginModal: (returnPath?: string) => void;
  closeLoginModal: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      showLoginModal: false,
      returnPath: "/",
      login: () =>
        set({
          token: "tempToken",
          showLoginModal: false,
        }),
      logout: () => set({ token: null }),
      openLoginModal: (returnPath = "/") =>
        set({ showLoginModal: true, returnPath }),
      closeLoginModal: () => set({ showLoginModal: false }),
    }),
    {
      name: "authToken",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ token: state.token }),
    },
  ),
);

export default useAuthStore;

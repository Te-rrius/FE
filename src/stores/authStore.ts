import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  showLoginModal: boolean;
  showLoginWebView: boolean;
  login: () => void;
  logout: () => void;
  returnPath: string;
  openLoginModal: (returnPath?: string) => void;
  closeLoginModal: () => void;
  openLoginWebView: () => void;
  closeLoginWebView: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      showLoginModal: false,
      showLoginWebView: false,
      returnPath: "/",
      login: () =>
        set({
          token: "tempToken",
          showLoginWebView: false,
          showLoginModal: false,
        }),
      logout: () => set({ token: null }),
      openLoginModal: (returnPath = "/") =>
        set({ showLoginModal: true, returnPath }),
      closeLoginModal: () => set({ showLoginModal: false }),
      openLoginWebView: () => set({ showLoginWebView: true }),
      closeLoginWebView: () => set({ showLoginWebView: false }),
    }),
    {
      name: "authToken",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ token: state.token }),
    },
  ),
);

export default useAuthStore;

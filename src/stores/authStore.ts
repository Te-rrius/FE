import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface AuthStore {
  token: string | null;
  showLoginModal: boolean;
  showKakaoWebView: boolean;
  login: () => void;
  logout: () => void;
  returnPath: string;
  openLoginModal: (returnPath?: string) => void;
  closeLoginModal: () => void;
  openKakaoWebView: () => void;
  closeKakaoWebView: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      showLoginModal: false,
      showKakaoWebView: false,
      returnPath: "/",
      login: () =>
        set({
          token: "tempToken",
          showKakaoWebView: false,
          showLoginModal: false,
        }),
      logout: () => set({ token: null }),
      openLoginModal: (returnPath = "/") =>
        set({ showLoginModal: true, returnPath }),
      closeLoginModal: () => set({ showLoginModal: false }),
      openKakaoWebView: () => set({ showKakaoWebView: true }),
      closeKakaoWebView: () => set({ showKakaoWebView: false }),
    }),
    {
      name: "authToken",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ token: state.token }),
    },
  ),
);

export default useAuthStore;

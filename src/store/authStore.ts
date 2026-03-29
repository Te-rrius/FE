import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthStore {
  token: string | null;
  showLoginModal: boolean;
  showAgreeModal: boolean;
  setShowAgreeModal: (v: boolean) => void;
  login: () => void;
  logout: () => void;
  isLoggingOut: boolean;
  returnPath: string;
  openLoginModal: (returnPath?: string) => void;
  closeLoginModal: () => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      token: null,
      showLoginModal: false,
      showAgreeModal: false,
      returnPath: '/',
      login: () =>
        set({
          token: 'tempToken',
          showLoginModal: false,
        }),
      isLoggingOut: false,
      logout: () => {
        set({ token: null, showLoginModal: false, isLoggingOut: true });
        setTimeout(() => set({ isLoggingOut: false }), 0);
      },
      openLoginModal: (returnPath = '/') => set({ showLoginModal: true, returnPath }),
      closeLoginModal: () => set({ showLoginModal: false }),
      setShowAgreeModal: (v) => set({ showAgreeModal: v }),
    }),
    {
      name: 'authToken',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ token: state.token }),
    },
  ),
);

export default useAuthStore;

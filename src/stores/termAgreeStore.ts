import { create } from 'zustand';

import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TermAgreeStore = {
  isPrivacyAgreed: boolean;
  isMarketingAgreed: boolean;
  setPrivacyAgreed: (v: boolean) => void;
  setMarketingAgreed: (v: boolean) => void;
};

export const useTermAgreeStore = create<TermAgreeStore>()(
  persist(
    (set) => ({
      isPrivacyAgreed: false,
      isMarketingAgreed: false,
      setPrivacyAgreed: (v) => set({ isPrivacyAgreed: v }),
      setMarketingAgreed: (v) => set({ isMarketingAgreed: v }),
    }),
    {
      name: 'term-agree-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

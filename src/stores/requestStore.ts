import { create } from 'zustand';

interface ScheduleStore {
  requestedIds: Set<number>;
  addRequestedId: (id: number) => void;
}

const useRequestStore = create<ScheduleStore>((set) => ({
  requestedIds: new Set(),
  addRequestedId: (id) => set((state) => ({ requestedIds: new Set(state.requestedIds).add(id) })),
}));

export default useRequestStore;

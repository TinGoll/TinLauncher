import { createStore, useStore } from "zustand";

type LoadingData = {
  loading: boolean;
};

type LoadingActions = {
  actions: {
    setLoading: (value: boolean) => void;
  };
};
type LoadingStore = LoadingData & LoadingActions;
const loadingStore = createStore<LoadingStore>()((set) => ({
  loading: false,
  actions: {
    setLoading: (value) => set({ loading: value }),
  },
}));

export const useLoading = () =>
  useStore(loadingStore, (state) => state.loading);
export const { setLoading } = loadingStore.getState().actions;

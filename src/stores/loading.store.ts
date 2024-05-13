import { createStore, useStore } from "zustand";

type LoadingData = {
  loading: boolean;
  removeFolderLoading: boolean;
};

type LoadingActions = {
  actions: {
    setLoading: (value: boolean) => void;
    setRemoveFolderLoading: (value: boolean) => void;
  };
};
type LoadingStore = LoadingData & LoadingActions;
const loadingStore = createStore<LoadingStore>()((set) => ({
  loading: false,
  removeFolderLoading: false,
  actions: {
    setLoading: (value) => set({ loading: value }),
    setRemoveFolderLoading: (value) => set({ removeFolderLoading: value }),
  },
}));

export const useLoading = () =>
  useStore(loadingStore, (state) => state.loading);
export const useRemoveFolderLoading = () =>
  useStore(loadingStore, (state) => state.removeFolderLoading);
export const { setLoading, setRemoveFolderLoading } =
  loadingStore.getState().actions;

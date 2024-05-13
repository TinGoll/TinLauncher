import { localStoragePersistMiddleware } from "@/zustandHelpers/localStoragePersistMiddleware.zustand";
import { createStore, useStore } from "zustand";

const LOCAL_STORAGE_KEY = "launcher-version-control";

type TState = {
  current: string | null;
  versions: string[];
};

type TActions = {
  actions: {
    setCurrentVersion: (version: string) => void;
    addVersions: (version: string) => void;
  };
};

type TStore = TState & TActions;

const defaultState: TState = {
  current: null,
  versions: [],
};

const VersionControlStore = createStore<TStore>()(
  localStoragePersistMiddleware(
    (set, get) => ({
      ...defaultState,
      actions: {
        setCurrentVersion: (version) =>
          set(() => {
            const { addVersions } = get().actions;
            addVersions(version);
            const state = get();
            return { ...state, current: version };
          }),
        addVersions: (version) =>
          set((state) => {
            const filteredVersions = state.versions.filter(
              (v) => v !== version
            );
            filteredVersions.push(version);
            return { ...state, versions: filteredVersions };
          }),
      },
    }),
    LOCAL_STORAGE_KEY
  )
);

export const { setCurrentVersion } = VersionControlStore.getState().actions;
export const useCurrentVersion = () =>
  useStore(VersionControlStore, (state) => state.current);

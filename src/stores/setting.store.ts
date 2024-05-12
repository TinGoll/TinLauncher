import { localStoragePersistMiddleware } from "@/zustandHelpers/localStoragePersistMiddleware.zustand";
import { createStore, useStore } from "zustand";

const SETTING_LOCAL_STORAGE_KEY = "launcher-setting-storage";

export type TLanguage = null | "russian" | "english";

type TSettingStore = {
  language: TLanguage;
  currentNickName?: string | null;
  latestNicknames: string[];
};

type TSettingStoreActions = {
  actions: {
    setLanguage: (language: TLanguage) => void;
    toggleLanguage: () => void;

    addLatestNicknames: (nicknames: string) => void;
    removeLatestNickname: (nicknames: string) => void;
    clearLatestNicknames: () => void;

    setCurrentNickName: (nickname: string) => void;
    removeNickName: () => void;
  };
};

type TStore = TSettingStore & TSettingStoreActions;

const initialState: TSettingStore = {
  language: null,
  currentNickName: undefined,
  latestNicknames: [],
};

const SettingStore = createStore<TStore>()(
  localStoragePersistMiddleware(
    (set, get) => ({
      ...initialState,
      actions: {
        setLanguage: (language) =>
          set({
            language,
          }),
        toggleLanguage: () =>
          set((state) => {
            const newLanguage: TLanguage =
              state.language === "english" ? "russian" : "english";
            return { ...state, language: newLanguage };
          }),

        addLatestNicknames: (nickname) =>
          set((state) => {
            const tempArr = state.latestNicknames.filter(
              (nick) =>
                nick.toLocaleLowerCase() !== nickname.toLocaleLowerCase()
            );
            tempArr.unshift(nickname);
            const newState = { ...state, latestNicknames: tempArr };
            return newState;
          }),

        removeLatestNickname: (nickname) =>
          set((state) => ({
            ...state,
            latestNicknames: state.latestNicknames.filter(
              (nick) =>
                nick.toLocaleLowerCase() !== nickname.toLocaleLowerCase()
            ),
          })),

        clearLatestNicknames: () =>
          set((state) => ({ ...state, latestNicknames: [] })),

        setCurrentNickName: (nickname: string) =>
          set(() => {
            const { addLatestNicknames } = get().actions;
            addLatestNicknames(nickname);
            const state = get();
            return {
              ...state,
              currentNickName: nickname,
            };
          }),

        removeNickName: () =>
          set((state) => ({ ...state, currentNickName: null })),
      },
    }),
    SETTING_LOCAL_STORAGE_KEY
  )
);

export const useLatestNicknamesList = () =>
  useStore(SettingStore, (state) => state.latestNicknames);

export const useCurrentNickname = () =>
  useStore(SettingStore, (state) => state.currentNickName);

export const useLanguage = () =>
  useStore(SettingStore, (state) => state.language);

export const useSetting = () => useStore(SettingStore, (state) => state);

export const {
  addLatestNicknames,
  clearLatestNicknames,
  removeLatestNickname,
  setCurrentNickName,
  setLanguage,
  toggleLanguage,
  removeNickName,
} = SettingStore.getState().actions;

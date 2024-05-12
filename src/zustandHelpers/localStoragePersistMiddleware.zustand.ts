import { persist } from "zustand/middleware";
import { StateCreator } from "zustand";
import { partializeExcludeActions } from "./partializeExcludeActions.zustand";

/**
 * Функция-хелпер для синхронизации zustand-стора с localStorage
 *
 * Включается в себя partialize: partializeExcludeActions
 * @param {Function} f Store creator func
 * @param {string} localStorageKey local storage key
 * @returns {Object} persisted store
 */
export const localStoragePersistMiddleware = <State extends object>(
  f: StateCreator<State>,
  localStorageKey: string
): StateCreator<State, [], [["zustand/persist", unknown]]> =>
  persist(f, {
    name: localStorageKey,
    partialize: partializeExcludeActions,
  });

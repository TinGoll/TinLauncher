import { Mutate, StoreApi } from "zustand";

export type StoreWithPersist<T> = Mutate<
  StoreApi<T>,
  [["zustand/persist", unknown]]
>;

/**
 * Функция для синхронизации zustand-store(persisted) между разными окнами
 * @param {Object} store Zustand persisted store
 * @returns {Function} Функция отписка
 */
export const withStorageDOMEvents = <T>(store: StoreWithPersist<T>): Function => {
  const storageEventCallback = (e: StorageEvent) => {
    if (e.key === store.persist.getOptions().name && e.newValue) {
      store.persist.rehydrate();
    }
  };

  window.addEventListener("storage", storageEventCallback);

  return () => {
    window.removeEventListener("storage", storageEventCallback);
  };
};

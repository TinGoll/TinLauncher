/**
 * Наша структура в zustand-store подразумевает объект
 *
 * actions: {
 *   тут наши экшоны
 * }
 *
 * Если в сторе используется persist, нужно в поле partialize конфига прокинуть эту функцию
 *
 * Функция для исключения поля actions из синхронизации с persist-store
 * @param {Object} state with "actions" field
 * @return {Object} state without "actions" field
 */
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const partializeExcludeActions = <U extends object>(
  state: U
): Omit<U, "actions"> =>
  Object.fromEntries(
    Object.entries(state).filter(([key]) => !["actions"].includes(key))
  ) as Omit<U, "actions">;

import { TLanguage } from "@/stores/setting.store";

const variables = [
  // Ввод ника
  "INPUT_ENTER_NICK_TEXT",
  "INPUT_ENTER_NICK_BUTTON_TEXT",
  "INPUT_ENTER_NICK_INFO",
  "NICKS_OF_LAST_PLAYERS",
  "SERVER_DESCRIPTION_CLASSIC",
  "SERVER_DESCRIPTION_INDUSTRIAL",
  "SERVER_DISPLAY_INFO_PLAYING",
  "SERVER_DESCRIPTION",
  "VERSION",
  "OFFLINE_SERVER",
  "PLAYER_NOW_PLAYING",
  "CHANGE_PLAYER",
  "TIN_LAUNCHER",
  "CHANGE_LANGUAGE",
  "VALIDATE_ERROR_NICKNAME",
  "AND_OTHERS",
  "THERE_IS_NO_ONE_ON_THE_SERVER",
  "TO_MEET_AN_ADVENTURE",
  "LOADING_HAS_STARTED",
  "LEFT_A_LITTLE",
] as const;

type Localisation = Record<(typeof variables)[number], string>;
type LocalisationValue = {
  [key in NonNullable<TLanguage>]: string;
};
type LocalisationList = Record<(typeof variables)[number], LocalisationValue>;

const list: LocalisationList = {
  INPUT_ENTER_NICK_TEXT: {
    english: "Enter your nickname",
    russian: "Введи свой ник",
  },
  NICKS_OF_LAST_PLAYERS: {
    english: "List of recent players",
    russian: "Список последних игроков",
  },
  INPUT_ENTER_NICK_INFO: {
    english:
      "To play, you need to come up with a nickname - the name of the player that other players will see.",
    russian:
      "Для игры необходимо придумать никнейм – имя игрока, которое будут видеть другие игроки.",
  },
  INPUT_ENTER_NICK_BUTTON_TEXT: {
    english: "Submit",
    russian: "Принять",
  },
  SERVER_DESCRIPTION_CLASSIC: {
    english:
      "This is a classic Minecraft survival server. The server is designed for comfortable and relaxed play with friends.",
    russian:
      "Это классический сервер для выживания в Minecraft. Сервер создан для комфортной и размеренной игры с друзьями.",
  },
  SERVER_DESCRIPTION_INDUSTRIAL: {
    english:
      "Welcome to a technological paradise for both complete beginners and experienced researchers with the Industrial Craft, Applied Energistics and other mods",
    russian:
      "Добро пожаловать в технологический рай как для совсем начинающих, так и для уже опытных исследователей с модом Industrial Craft, Applied Energistics и другими",
  },
  SERVER_DISPLAY_INFO_PLAYING: {
    english: "Online",
    russian: "Онлайн",
  },
  SERVER_DESCRIPTION: {
    english: "Server description",
    russian: "Описание сервера",
  },
  VERSION: {
    english: "Version",
    russian: "Версия",
  },
  OFFLINE_SERVER: {
    english: "Offline",
    russian: "Выключен",
  },
  PLAYER_NOW_PLAYING: {
    english: "You play under the nickname",
    russian: "Вы играете под ником",
  },

  CHANGE_PLAYER: {
    english: "Change player",
    russian: "Сменить игрока",
  },
  TIN_LAUNCHER: {
    english: "Tin Launcher",
    russian: "Тин Лаунчер",
  },
  CHANGE_LANGUAGE: {
    english: "Изменить язык на русский",
    russian: "Change language to English",
  },
  VALIDATE_ERROR_NICKNAME: {
    english: "Nickname must contain only Latin letters!",
    russian: "Ник должен содержать только латинские буквы!",
  },
  AND_OTHERS: {
    english: "and others",
    russian: "и другие",
  },
  THERE_IS_NO_ONE_ON_THE_SERVER: {
    english: "There is no one on the server",
    russian: "На сервере никого нет",
  },
  TO_MEET_AN_ADVENTURE: {
    english: "To meet adventures!",
    russian: "На встречу приключениям!",
  },
  LOADING_HAS_STARTED: {
    english: "Download has started",
    russian: "Загрузка началась",
  },
  LEFT_A_LITTLE: {
    english: "Not for long anymore. Wait for the game to load.",
    russian: "Осталось немного, дождитесь загрузки игры",
  },
};

export const localisation = (language: TLanguage): Localisation => {
  const localizedValues: Localisation = {} as Localisation;
  variables.forEach((variable) => {
    if (list[variable]) {
      localizedValues[variable] = list[variable][language || "english"];
    }
  });
  return localizedValues;
};

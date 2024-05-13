import * as fs from "fs";
import path from "path";
import { DEV_FOLDER_NAME, PROD_FOLDER_NAME } from "./constants";

export const isExistsFolder = (path: string): boolean => {
  return fs.existsSync(path);
};

export const removeFolder = (folderPath: string): boolean => {
  try {
    if (isExistsFolder(folderPath)) {
      fs.rmdirSync(folderPath, { recursive: true });
      return false;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const createFolder = (folderPath: string): boolean => {
  try {
    if (!isExistsFolder(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const getDataPath = () => {
  const NODE_ENV = process.env.NODE_ENV as "development" | "production";
  const isDevelopment = NODE_ENV === "development";
  const APP_DATA_PATH = process.env.APPDATA || "";
  const APP_ROOT = process.env.APP_ROOT;
  const FOLDER_NAME = isDevelopment ? DEV_FOLDER_NAME : PROD_FOLDER_NAME;
  const DEV_PATH = path.join(APP_ROOT, "..", FOLDER_NAME);
  const PROD_PATH = path.join(APP_DATA_PATH, FOLDER_NAME);
  return isDevelopment ? DEV_PATH : PROD_PATH;
};

export const getClientFolderPath = (srverName: TinLauncher.ServerType) => {
  const APP_DATA_PATH = process.env.APPDATA || "";
  const APP_ROOT = process.env.APP_ROOT;

  const NODE_ENV = process.env.NODE_ENV as "development" | "production";

  const isDevelopment = NODE_ENV === "development";

  const FOLDER_NAME = isDevelopment ? DEV_FOLDER_NAME : PROD_FOLDER_NAME;

  const DEV_PATH = path.join(APP_ROOT, "..", FOLDER_NAME, srverName);
  const PROD_PATH = path.join(APP_DATA_PATH, FOLDER_NAME, srverName);

  const PATH = isDevelopment ? DEV_PATH : PROD_PATH;
  return PATH;
};

export const removeClientFolder = (
  srverName: TinLauncher.ServerType
): boolean => {
  const PATH = getClientFolderPath(srverName);
  return removeFolder(PATH);
};

export const removeFolderInAppDataDirectory = (folderName: string) => {
  const PATH = getDataPath();
  const folderPath = path.join(PATH, folderName);
  return removeFolder(folderPath);
};

export const readFolder = (directoryPath: string) => {
  return new Promise((res, rej) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) {
        console.error("Ошибка чтения каталога:", err);
        rej(err);
      }
      res(files);
    });
  });
};

export const copyFolderRecursive = (source: string, target: string) => {
  // Проверяем, существует ли целевая папка, если нет, создаем ее
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target);
  }

  // Получаем список файлов в исходной папке
  const files = fs.readdirSync(source);

  // Проходимся по всем файлам и подпапкам
  files.forEach((file) => {
    const sourceFilePath = path.join(source, file);
    const targetFilePath = path.join(target, file);

    // Если текущий элемент является папкой, вызываем функцию рекурсивно
    if (fs.statSync(sourceFilePath).isDirectory()) {
      copyFolderRecursive(sourceFilePath, targetFilePath);
    } else {
      // Если текущий элемент является файлом, копируем его
      fs.copyFileSync(sourceFilePath, targetFilePath);
    }
  });
};

export const installingFolders = () => {
  const appDataPath = getDataPath();
  const packagePath = path.join(appDataPath, "package");
  const VITE_PUBLIC = process.env.VITE_PUBLIC;
  createFolder(path.join(appDataPath, "package"));
  copyFolderRecursive(path.join(VITE_PUBLIC, "package"), packagePath);
};

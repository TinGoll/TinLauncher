import * as fs from "fs";
import path from "path";
import { DEV_FOLDER_NAME, PROD_FOLDER_NAME } from "./constants";

export const isExistsFolder = (path: string): boolean => {
  return fs.existsSync(path);
};

export const removeFolder = (path: string): boolean => {
  try {
    if (isExistsFolder(path)) {
      fs.rmdirSync(path, { recursive: true });
      return false;
    }
    return false;
  } catch (error) {
    return false;
  }
};

export const createFolder = (path: string): boolean => {
  try {
    if (!isExistsFolder(path)) {
      fs.mkdirSync(path, { recursive: true });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
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
  const path = getClientFolderPath(srverName);
  return removeFolder(path);
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

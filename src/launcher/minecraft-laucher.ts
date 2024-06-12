import { BrowserWindow } from "electron";
import MLC, { ILauncherOptions } from "minecraft-launcher-core";
import { classicOptions, industrialOptions } from "./options";
import {
  createFolder,
  findJavaExecutable,
  getClientFolderPath,
  getDataPath,
  isExistsFolder,
} from "./utils";
import path from "path";

const minecraftLauncher = async (
  win: BrowserWindow | null,
  { nickname, serverType, options }: TinLauncher.LaucherArgs
): Promise<void> => {
  const { Client, Authenticator } = MLC;
  const launcher = new Client();

  const PATH = getClientFolderPath(serverType);
  const JAVA_PATH = findJavaExecutable() || undefined;

  const PACKAGE_PATH = path.join(getDataPath(), "package");

  const defaultOptions =
    serverType === "industrial"
      ? {
          ...industrialOptions,
          forge: path.join(
            PACKAGE_PATH,
            "industrial",
            "forge",
            "forge-1.20.1-47.3.0-installer.jar"
          ),
        }
      : classicOptions;

  const isFolderExists = isExistsFolder(PATH);
  const isCreated = createFolder(PATH);

  const clientPackage = isFolderExists
    ? {}
    : { clientPackage: `${PACKAGE_PATH}/${serverType}/${serverType}.zip` };

  let opts: ILauncherOptions = {
    root: PATH,
    authorization: Authenticator.getAuth(nickname),
    javaPath: JAVA_PATH,
    ...defaultOptions,
    ...clientPackage,
    ...options,
  };

  // readFolder(path.join(VITE_PUBLIC, "package", "industrial", "forge")).then(
  //   (files) => win?.webContents.send("minecraft-files", files)
  // );

  // События

  launcher.on("progress", (e) =>
    win?.webContents.send("minecraft-progress", e)
  );
  launcher.on("arguments", (e) =>
    win?.webContents.send("minecraft-arguments", e)
  );
  launcher.on("data", (e) => win?.webContents.send("minecraft-data", e));
  launcher.on("close", (e) => win?.webContents.send("minecraft-close", e));
  launcher.on("package-extract", (e) =>
    win?.webContents.send("minecraft-package-extract", e)
  );
  launcher.on("download-status", (e) =>
    win?.webContents.send("minecraft-download-status", e)
  );
  launcher.on("debug", (e) => win?.webContents.send("minecraft-debug", e));

  launcher
    .launch(opts)
    .then(() => win?.webContents.send("minecraft-start", "start"))
    .catch((err) => win?.webContents.send("minecraft-error", "error"));
};

export default minecraftLauncher;

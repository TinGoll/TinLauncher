import { BrowserWindow } from "electron";
import MLC, { ILauncherOptions } from "minecraft-launcher-core";
import { classicOptions, industrialOptions } from "./options";
import {
  createFolder,
  getClientFolderPath,
  isExistsFolder,
  readFolder,
} from "./utils";
import path from "path";

const minecraftLauncher = async (
  win: BrowserWindow | null,
  { nickname, serverType, options = {} }: TinLauncher.LaucherArgs
): Promise<void> => {
  const { Client, Authenticator } = MLC;
  const launcher = new Client();

  // const launcherVersion = process.env.npm_package_version;
  const PATH = getClientFolderPath(serverType);
  const VITE_PUBLIC = process.env.VITE_PUBLIC;
  const PACKAGE_PATH = path.join(VITE_PUBLIC, "package");

  const defaultOptions =
    serverType === "industrial"
      ? {
          ...industrialOptions,
          forge: path.join(
            VITE_PUBLIC,
            "package",
            "industrial",
            "forge",
            "forge-1.19.2-43.3.8-installer.jar"
          ),
        }
      : classicOptions;

  const isFolderExists = isExistsFolder(PATH);
  const clientPackage = isFolderExists
    ? {}
    : { clientPackage: `${PACKAGE_PATH}/${serverType}/${serverType}.zip` };

  let opts: ILauncherOptions = {
    root: PATH,
    authorization: Authenticator.getAuth(nickname),
    ...defaultOptions,
    ...clientPackage,
    ...options,
  };

  const isFolderCreated = createFolder(PATH);
  if (isFolderCreated) {
    win?.webContents.send("minecraft-debug", { isFolderCreated, opts });
  }

  readFolder(path.join(VITE_PUBLIC, "package", "industrial", "forge")).then(
    (files) => win?.webContents.send("minecraft-files", files)
  );

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
    .catch((err) => win?.webContents.send("minecraft-error", "start"));
};

export default minecraftLauncher;

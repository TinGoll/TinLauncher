import { BrowserWindow } from "electron";
import MLC, { ILauncherOptions } from "minecraft-launcher-core";
import { classicOptions, industrialOptions } from "./options";

const minecraftLauncher = async (
  win: BrowserWindow | null,
  { nickname, serverType, options = {} }: TinLauncher.LaucherArgs
): Promise<void> => {
  const { Client, Authenticator } = MLC;
  const launcher = new Client();

  const defaultOptions =
    serverType === "industrial" ? industrialOptions : classicOptions;

  let opts: ILauncherOptions = {
    authorization: Authenticator.getAuth(nickname),
    ...defaultOptions,
    ...options,
  };

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

  return launcher
    .launch(opts)
    .then(() => win?.webContents.send("minecraft-start", "start"));
};

export default minecraftLauncher;

import { ILauncherOptions } from "minecraft-launcher-core";
import servers from "./servers";

type TOptions = Omit<ILauncherOptions, "authorization">;

export const industrialOptions: TOptions = {
  root: `./minecraft/industrial`,
  version: {
    number: "1.19.2",
    type: "release",
  },
  memory: {
    max: "6G",
    min: "2G",
  },
  forge: "./clientPackage/industrial/forge/forge-1.19.2-43.3.8-installer.jar",
  quickPlay: {
    type: "legacy",
    identifier: servers.INDUSTRIAL_SERVER,
  },
  // clientPackage: "./clientPackage/industrial/industrial.zip",
  overrides: {
    detached: false,
  },
};

export const classicOptions: TOptions = {
  root: `./minecraft/classic`,
  version: {
    number: "1.20.4",
    type: "release",
  },
  memory: {
    max: "6G",
    min: "2G",
  },
  quickPlay: {
    type: "multiplayer",
    identifier: servers.CLASSIC_SERVER,
  },
  // clientPackage: "./clientPackage/classic/classic.zip",
  overrides: {
    detached: false,
  },
};

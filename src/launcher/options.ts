import { ILauncherOptions } from "minecraft-launcher-core";
import servers from "./servers";

type TOptions = Omit<ILauncherOptions, "authorization" | "root" | 'memory'>;

export const industrialOptions: TOptions = {
  version: {
    number: "1.20.1",
    type: "release",
  },
  quickPlay: {
    type: "multiplayer",
    identifier: servers.INDUSTRIAL_SERVER,
  },
  overrides: {
    detached: false,
  },
};

export const classicOptions: TOptions = {
  version: {
    number: "1.20.4",
    type: "release",
  },
  quickPlay: {
    type: "multiplayer",
    identifier: servers.CLASSIC_SERVER,
  },
  overrides: {
    detached: false,
  },
};

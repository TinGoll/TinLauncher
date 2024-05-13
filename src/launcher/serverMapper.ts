import servers from "./servers";

type Mapper = Record<TinLauncher.ServerType, string>;

const map: Mapper = {
  industrial: servers.INDUSTRIAL_SERVER,
  classic: servers.CLASSIC_SERVER,
};

export const serverMapper = (serverType: TinLauncher.ServerType): string => {
  return map[serverType];
};

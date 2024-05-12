import { localisation } from "@/localisation";
import { TLanguage } from "@/stores/setting.store";

type Mapper = Record<TinLauncher.ServerType, string>;

export const descriptionMapper = (
  serverType: TinLauncher.ServerType,
  language: TLanguage
) => {
  const map: Mapper = {
    industrial: localisation(language).SERVER_DESCRIPTION_INDUSTRIAL,
    classic: localisation(language).SERVER_DESCRIPTION_CLASSIC,
  };

  return map[serverType];
};

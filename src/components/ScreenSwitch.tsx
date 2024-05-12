import { useCurrentNickname, useLanguage } from "@/stores/setting.store";
import { LanguageSelection } from "./LanguageSelection";
import { EnteringNickname } from "./EnteringNickname";
import { ServerSelection } from "./ServerSelection";
import { useLoading } from "@/stores/loading.store";
import { LoadingScreen } from "./LoadingScreen";

export const ScreenSwitch = () => {
  const lang = useLanguage();
  const nickname = useCurrentNickname();
  const loading = useLoading();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!lang) {
    return <LanguageSelection />;
  }
  if (!nickname) {
    return <EnteringNickname />;
  }
  return <ServerSelection />;
};

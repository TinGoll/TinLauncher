import {
  useCurrentNickname,
  useLanguage,
  useLauncherMemory,
} from "@/stores/setting.store";
import { LanguageSelection } from "./LanguageSelection";
import { EnteringNickname } from "./EnteringNickname";
import { ServerSelection } from "./ServerSelection";
import { useLoading } from "@/stores/loading.store";
import { LoadingScreen } from "./LoadingScreen";
import { useEffect, useState } from "react";
import { NoJava } from "./NoJava";
import { Memory } from "./Memory";

export const ScreenSwitch = () => {
  const [javaPath, setJavaPath] = useState<string | null>(null);
  const [examination, setExamination] = useState(true);
  const lang = useLanguage();
  const nickname = useCurrentNickname();
  const loading = useLoading();
  const memory = useLauncherMemory();

  useEffect(() => {
    window.electronAPI
      .getJavaPath()
      .then((javaPath) => setJavaPath(javaPath))
      .finally(() => setExamination(false));
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!javaPath) {
    return <NoJava examination={examination} />;
  }

  if (!lang) {
    return <LanguageSelection />;
  }

  if (!memory) {
    return <Memory />;
  }

  if (!nickname) {
    return <EnteringNickname />;
  }

  return <ServerSelection />;
};

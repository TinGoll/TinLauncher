import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { FC, useEffect } from "react";
import { Layout } from "./components/Layout";
import { ScreenSwitch } from "./components/ScreenSwitch";
import { setLoading } from "./stores/loading.store";
import {
  setCurrentVersion,
  useCurrentVersion,
} from "./stores/version-control.store";
import { serverNames } from "./launcher/servers";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App: FC = () => {
  const previusVersion = useCurrentVersion();

  useEffect(() => {
    const fetchCurrentVersion = async () => {
      const currentVerion = window.electronAPI.getConfig("npm_package_version");
      if (currentVerion && previusVersion !== currentVerion) {
        setCurrentVersion(currentVerion);
        for (const serverName of serverNames) {
          window.electronAPI.removeFolderInAppDataDirectory(serverName);
        }
        window.electronAPI.removeFolderInAppDataDirectory("package");
        window.electronAPI
          .installingFolders()
          .then((result) => console.log("installingFolders", result));
      }
    };

    fetchCurrentVersion();
  }, [previusVersion]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleStart = () => {
      // timeoutId = setTimeout(() => {
      //   setLoading(false);
      //   window.electronAPI.winHidden();
      // }, 30000);
    };
    const handleClose = () => {
      setLoading(false);
      window.electronAPI.winShow();
    };

    window.ipcRenderer.on("minecraft-start", handleStart);
    window.ipcRenderer.on("minecraft-close", handleClose);
    () => {
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Layout>
        <ScreenSwitch />
      </Layout>
    </ThemeProvider>
  );
};

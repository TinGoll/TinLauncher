import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { FC, useEffect } from "react";
import { Layout } from "./components/Layout";
import { ScreenSwitch } from "./components/ScreenSwitch";
import { setLoading } from "./stores/loading.store";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export const App: FC = () => {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleStart = () => {

      timeoutId = setTimeout(() => {
        setLoading(false);
        window.electronAPI.winHidden();
      }, 20000);

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

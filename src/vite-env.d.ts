/// <reference types="vite/client" />

interface Window {
  // expose in the `electron/preload/index.ts`
  ipcRenderer: import("electron").IpcRenderer;
  electronAPI: {
    launchMinecraft: (options: TinLauncher.LaucherArgs) => Promise<void>;
    getServerStatus: (
      options: TinLauncher.ServerStatusArgs
    ) => Promise<TinLauncher.ServerStatusReturn | null>;
    winHidden: () => Promise<void>;
    winShow: () => Promise<void>;
    getConfig: (value: string) => string | null;
    getEnv: <T extends object>() => T | null;
    removeClientFolder: (path: string) => boolean;
    removeFolderInAppDataDirectory: (path: string) => boolean;
    installingFolders: () => boolean;
  };
}

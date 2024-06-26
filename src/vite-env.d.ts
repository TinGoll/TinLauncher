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
    getEnv: <T extends object>() => Partial<T>;
    getJavaPath: () => Promise<string>;
    removeClientFolder: (path: string) => boolean;
    removeFolderInAppDataDirectory: (path: string) => boolean;
    installingFolders: () => boolean;
    getMemoryInfo: () => {
      totalMemory: number;
      freeMemory: number;
    };
  };
}

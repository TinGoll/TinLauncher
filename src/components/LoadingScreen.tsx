import {
  Box,
  LinearProgress,
  Paper,
  Typography,
  linearProgressClasses,
  styled,
} from "@mui/material";
import { FC, useEffect, useState } from "react";
import loadinScreenImg from "../assets/launcher/loading-bg.jpg";
import { useLanguage } from "@/stores/setting.store";
import { localisation } from "@/localisation";
import { Progress } from "./Progress";
import { IpcRendererEvent } from "electron";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const Screen = styled("div")`
  position: relative;
  height: 100%;
  width: 100%;
  background: #000;
  & .img {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  & .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgb(255, 255, 255);
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.02) 50%,
      rgba(0, 0, 0, 1) 100%
    );
  }
  & .content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    & .form {
      background: #007b254c;
      backdrop-filter: Blur(6px);
      padding: 8px;
      border-radius: 6px;
      & .paper {
        position: relative;
        padding: 8px;
        width: 360px;
        min-height: 180px;

        & .progress {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 16px;
        }
      }
    }
  }
`;

type Proggress = {
  type: string;
  task: number;
  total: number;
};

type Download = {
  name: string;
  type: string;
  current: number;
  total: number;
};

export const LoadingScreen: FC = () => {
  const [loadingProggress, setLoadingProggress] = useState<number>(0);
  // const [resourceName, setResourceName] = useState<string>("");
  const [download, setDownload] = useState<Download | null>(null);
  const [extractName, setExtractName] = useState<string>("");
  const language = useLanguage();
  const { TO_MEET_AN_ADVENTURE, LOADING_HAS_STARTED, LEFT_A_LITTLE } =
    localisation(language);

  useEffect(() => {
    const handleProgress = (
      _: IpcRendererEvent,
      ...args: [Proggress, ...any]
    ) => {
      const [progressData] = args;
      // setResourceName(progressData.type || "");
      setLoadingProggress(
        (Number(progressData.task) / progressData.total) * 100
      );
    };

    const handleDownload = (
      _: IpcRendererEvent,
      ...args: [Download, ...any]
    ) => {
      const [downloadData] = args;
      setDownload(downloadData || null);
    };

    const handleExtract = (
      _: IpcRendererEvent,
      ...args: [Proggress, ...any]
    ) => {
      console.log("handleExtract", args);
    };

    window.ipcRenderer.on("minecraft-progress", handleProgress);
    window.ipcRenderer.on("minecraft-debug", (e) => console.log(e));
    window.ipcRenderer.on("minecraft-download-status", handleDownload);
    window.ipcRenderer.on("minecraft-package-extract", handleExtract);
  }, []);

  return (
    <Screen>
      <div className="img">
        <img src={loadinScreenImg} alt="load-screen-img" />
      </div>
      <div className="overlay" />
      <div className="content">
        <div className="form">
          <Paper className="paper" elevation={3}>
            <div>
              <Typography
                sx={{ textAlign: "center" }}
                variant="h5"
                color="#FFFF00"
              >
                {TO_MEET_AN_ADVENTURE}
              </Typography>
            </div>
            <div>
              <Typography
                sx={{ textAlign: "center" }}
                variant="body1"
                color="#b9b9b9"
              >
                {LOADING_HAS_STARTED}...
              </Typography>
            </div>
            <div className="progress">
              <Progress color="warning" value={loadingProggress} />
            </div>

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {loadingProggress === 100 && (
                <div>
                  <Typography color="#FBFE00" variant="caption">
                    {LEFT_A_LITTLE}...
                  </Typography>
                </div>
              )}
              {download && (
                <div>
                  <Typography
                    sx={{
                      textAlign: "center",
                      display: "block",
                      maxWidth: "300px",
                    }}
                    noWrap
                    color="gray"
                    variant="caption"
                  >
                    download: {download?.type} {download.name}
                  </Typography>
                  <BorderLinearProgress
                    sx={{ width: 320 }}
                    variant="determinate"
                    value={
                      (Number(download?.current) / Number(download?.total)) *
                      100
                    }
                  />
                </div>
              )}
              {extractName && (
                <div>
                  <Typography
                    sx={{
                      textAlign: "center",
                      display: "block",
                      maxWidth: "300px",
                    }}
                    noWrap
                    color="gray"
                    variant="caption"
                  >
                    extractName: {extractName}
                  </Typography>
                </div>
              )}
            </Box>
          </Paper>
        </div>
      </div>
    </Screen>
  );
};

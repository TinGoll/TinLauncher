import { serverMapper } from "../../launcher/serverMapper";
import { FC, useEffect, useState } from "react";
import LensRoundedIcon from "@mui/icons-material/LensRounded";
import {
  Box,
  CircularProgress,
  Divider,
  Paper,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import { descriptionMapper } from "@/utils/description-mapper";
import { useLanguage } from "@/stores/setting.store";
import { localisation } from "@/localisation";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

import offlineIcon from "../assets/launcher/server-offline-icon.png";
import Zoom from "@mui/material/Zoom";

const Container = styled("div")`
  position: relative;
  width: 100%;
  padding-top: 100%;
  user-select: none;
  & .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #00800058;
    /* border: 2px solid #3d3d3dcc; */
    border-radius: 6 px;
    backdrop-filter: Blur(10px);
    overflow: hidden;
    cursor: pointer;
    transition: top 0.3s ease-in-out; /* Добавлено свойство transition */
    padding: 16px;
    :hover {
      top: -4px;
      -webkit-box-shadow: 0px 0px 10px 0px #b2ab2e;
      -moz-box-shadow: 0px 0px 10px 0px #b2ab2e;
      box-shadow: 0px 0px 10px 0px #b2ab2e;
    }

    & .title {
      padding: 16px;
      height: 100%;
      & .display-data {
        display: flex;
        gap: 16px;
        & .server-icon {
          object-fit: cover;
          height: 64px;
          width: auto;
        }
        & .status {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
          & .server-name {
            display: flex;
            align-items: center;
            gap: 8px;
            span {
              line-height: 22px;
            }
            svg {
              font-size: 12px;
            }
          }

          & .online {
            display: flex;
            align-items: center;
            flex-direction: row;
            gap: 8px;
            svg {
              height: 16px;
              color: #35c0cd;
            }
            p {
              margin: 0;
              font-size: 12px;
              span {
                color: #8ef13c;
              }
            }
            & .offline-server {
              color: #cd0074;
              font-weight: 500;
              line-height: 18px;
              margin: 0;
            }
          }
          & .version {
            p {
              margin: 0;
              font-size: 14px;
              span {
                color: #d25fd2;
              }
            }
          }
        }
      }

      & .description {
        & .description-title {
          p {
            font-size: 14px;
            color: #009999;
          }
        }

        & .description-text {
          margin-top: 8px;
          font-size: 12px;
          font-weight: 300;
        }
      }
    }

    & .start-version {
      position: absolute;
      right: 26px;
      bottom: 26px;
      z-index: 10;
      height: 32px;
      width: 32px;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        font-size: 30px;
        transition: font-size 0.2s ease-in;
        color: #ffe800;
      }
    }

    :hover .start-version {
      svg {
        font-size: 36px;
        color: #78e700;
      }
    }

    :active .start-version {
      svg {
        font-size: 36px;
        color: #4380d3;
      }
    }
  }
`;

const Versionregex = /\d+\.\d+\.\d+/;

const getVersion = (str?: string): string | null => {
  if (!str) {
    return null;
  }
  const match = str.match(Versionregex);
  if (match) {
    const version = match[0];
    return version;
  } else {
    return null;
  }
};

const getOnlineNicknames = (nicknames: string[] = []) => {
  const sortedNicknames = [...nicknames];
  sortedNicknames.sort();
  return sortedNicknames.slice(0, 20).join(", ");
};

type Props = {
  server: TinLauncher.ServerType;
  onLaunch: (serverName: TinLauncher.ServerType) => void;
};
export const SeverBlock: FC<Props> = ({ server, onLaunch }) => {
  const language = useLanguage();
  const [data, setData] = useState<TinLauncher.ServerStatusReturn | null>(null);
  const [dataLoading, setDataLoading] = useState<boolean>(false);
  const serverAddress = serverMapper(server);

  const {
    SERVER_DISPLAY_INFO_PLAYING,
    SERVER_DESCRIPTION,
    VERSION,
    OFFLINE_SERVER,
    AND_OTHERS,
    THERE_IS_NO_ONE_ON_THE_SERVER,
  } = localisation(language);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serverStatus = await window.electronAPI.getServerStatus({
          address: serverAddress,
          enableSRV: false,
          sessionID: Date.now(),
        });

        setData(serverStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      }
    };

    setDataLoading(true);
    fetchData().finally(() => setDataLoading(false));

    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [serverAddress]);

  const description = descriptionMapper(server, language);
  const version = getVersion(data?.version.name);

  return (
    <Container onClick={() => onLaunch(server)}>
      <div className="content">
        <Paper className="title" elevation={3}>
          {dataLoading ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress color="success" />
            </Box>
          ) : (
            <div className="display-data">
              <img
                className="server-icon"
                src={data?.favicon || offlineIcon}
                alt="server-icon"
              />
              <div className="status">
                <div className="server-name">
                  <Typography margin={0} variant="overline">
                    {server}
                  </Typography>
                  <LensRoundedIcon
                    color={data?.players ? "success" : "error"}
                  />
                </div>
                <div className="online">
                  {data?.players ? (
                    <>
                      <p>
                        {SERVER_DISPLAY_INFO_PLAYING}:{" "}
                        <span>{data?.players.online || 0}</span> /{" "}
                        <span>{data?.players.max || 0}</span>
                      </p>
                      <Tooltip
                        TransitionComponent={Zoom}
                        title={
                          data?.players.sample?.length
                            ? `${SERVER_DISPLAY_INFO_PLAYING}: ${getOnlineNicknames(
                                data.players.sample.map((user) => user.name)
                              )}${
                                data.players.sample.slice(0, 20).length <
                                data.players.sample.length
                                  ? " " + AND_OTHERS + "..."
                                  : ""
                              }`
                            : THERE_IS_NO_ONE_ON_THE_SERVER
                        }
                      >
                        <InfoOutlinedIcon />
                      </Tooltip>
                    </>
                  ) : (
                    <p className="offline-server">{OFFLINE_SERVER}</p>
                  )}
                </div>
                {version && (
                  <div className="version">
                    <p>
                      {VERSION}: <span>{version}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
          <Divider sx={{ my: 1 }} />
          <div className="description">
            <div className="description-title">
              <p>{SERVER_DESCRIPTION}:</p>
            </div>
            <div className="description-text">
              <span>{description}</span>
            </div>
          </div>
          <div className="start-version">
            <PlayCircleRoundedIcon />
          </div>
        </Paper>
      </div>
    </Container>
  );
};

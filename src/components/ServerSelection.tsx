import { Button, Tooltip, styled } from "@mui/material";
import { FC } from "react";
import { SeverBlock } from "./SeverBlock";
import {
  clearMemory,
  removeNickName,
  toggleLanguage,
  useCurrentNickname,
  useLanguage,
  useLauncherMemory,
} from "@/stores/setting.store";
import { localisation } from "@/localisation";
import { PiCherriesFill } from "react-icons/pi";
import { US, RU } from "country-flag-icons/react/3x2";
import { setLoading } from "@/stores/loading.store";
import { serverNames } from "../launcher/servers";
import MemoryIcon from "@mui/icons-material/Memory";

const Container = styled("div")`
  & .servers {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 36px;
    padding: 36px;
    box-sizing: border-box;
    margin-top: 16px;
  }
  & .info {
    background: #121212a6;
    backdrop-filter: Blur(10px);
    padding: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    & .logo {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 8px;
      text-transform: uppercase;
      font-size: 14px;
      color: #ffaa00;
      svg {
        font-size: 18px;
        color: #e40045;
      }
    }

    & .tools {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
      gap: 8px;

      & .language-button {
        height: 26px;
        width: 36px;
        svg {
          height: 26px;
        }
      }

      & .memory-button {
        height: 26px;
        width: 26px;
        padding: 0;
        svg {
          height: 26px;
          width: 26px;
        }
      }

      & .change-nickname {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 12px;
        span {
          color: #67e300;
          font-weight: 500;
        }
      }
    }
  }
`;

export const ServerSelection: FC = () => {
  const language = useLanguage();
  const nickname = useCurrentNickname();
  const memory = useLauncherMemory();
  const { TIN_LAUNCHER, CHANGE_LANGUAGE, PLAYER_NOW_PLAYING, CHANGE_PLAYER } =
    localisation(language);
  const handleToggleLanguage = () => toggleLanguage();
  const handleChangeNickname = () => removeNickName();

  const handleLaunch = (serverName: TinLauncher.ServerType): void => {
    if (!nickname || !serverName) {
      return;
    }
    setLoading(true);

    const [min, max] = memory || [2024, 4048];

    window.electronAPI.launchMinecraft({
      serverType: serverName,
      nickname: nickname,
      options: {
        memory: {
          min: `${min}M`,
          max: `${max}M`,
        },
      },
    });
  };

  return (
    <Container>
      <div className="info">
        <p className="logo">
          <PiCherriesFill />
          {TIN_LAUNCHER}
        </p>
        <div className="tools">
          <div className="change-nickname">
            <p>
              {PLAYER_NOW_PLAYING} "<span>{nickname}</span>
              {'" '}
            </p>
            <Button
              size="small"
              variant="contained"
              color="warning"
              onClick={handleChangeNickname}
            >
              {CHANGE_PLAYER}
            </Button>
          </div>
          <Tooltip title={CHANGE_LANGUAGE}>
            <Button className="language-button" onClick={handleToggleLanguage}>
              {language === "russian" ? <US /> : <RU />}
            </Button>
          </Tooltip>

          <Tooltip title="Изменить выделенную память">
            <Button className="memory-button" onClick={clearMemory}>
              <MemoryIcon />
            </Button>
          </Tooltip>
        </div>
      </div>
      <div className="servers">
        {serverNames.map((serverName) => (
          <SeverBlock
            key={serverName}
            server={serverName}
            onLaunch={handleLaunch}
          />
        ))}
      </div>
    </Container>
  );
};

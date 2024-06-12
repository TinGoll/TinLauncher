import { setMemory } from "@/stores/setting.store";
import { Button, Slider, Typography, styled } from "@mui/material";
import { FC, useEffect, useState } from "react";

const Container = styled("div")`
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
  .content {
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 80%;
    min-width: 600px;
    padding: 16px;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: Blur(8px);
    border: 2px solid #3d3d3d;
    border-radius: 8px;
  }

  .info {
    .title {
    }
    .subtitle {
      color: ${({ theme }) => theme.palette.text.secondary};
      margin-top: 8px;
    }

    .memory {
      margin-top: 32px;
      margin-bottom: 16px;
      p span {
        color: #ffff00;
      }
    }
  }

  .buttons {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
`;

export const minDistance = 32;
const recommendedMin = 2024;
const recommendedMax = 4096;

const bytesToMB = (bytes: number) => Math.floor(bytes / (1024 * 1024));

function valuetext(value: number) {
  return `${value}Mb`;
}

export const Memory: FC = () => {
  const [value, setValue] = useState<[number, number]>([0, 0]);
  const [minmax, setMinmax] = useState<[number, number]>([0, 0]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const { totalMemory } = window.electronAPI.getMemoryInfo() || {};
    if (totalMemory) {
      const min = 1024;
      const max = bytesToMB(totalMemory * 0.8);
      const value1 = recommendedMin >= max ? 1024 : recommendedMin;
      const value2 = recommendedMax >= max ? max : recommendedMax;
      setMinmax([min, max]);
      setValue([value1, value2]);
      setLoading(false);
    }
  }, []);

  const handleChange = (_: Event, newValue: number | number[]) => {
    const [min, max] = newValue as [number, number];
    if (max + minDistance <= min) {
      setValue([min, min + minDistance]);
      return;
    }
    setValue([min, max]);
  };

  const submitHandle = () => {
    setLoading(true);
    setMemory(value[0], value[1]);
  };

  return (
    <Container>
      <div className="content">
        <div className="info">
          <Typography variant="h6" className="title">
            Давайте выделим оперативную память для игры.
          </Typography>
          <Typography variant="subtitle2" className="subtitle">
            Для комфортной игры, можно установить минимальное значение{" "}
            {recommendedMin}Mb а максимальное {recommendedMax}Mb.
          </Typography>
          <div className="memory">
            <Typography>
              Минимальное: <span>{value[0]}</span> Mb
            </Typography>
            <Typography>
              Максимальное: <span>{value[1]}</span> Mb
            </Typography>
          </div>
        </div>
        {loading && <Typography>Идет расчет памяти...</Typography>}
        {!loading && (
          <Slider
            color="secondary"
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            marks
            step={minDistance}
            min={minmax[0]}
            max={minmax[1]}
          />
        )}
        <div className="buttons">
          <Button variant="contained" color="success" onClick={submitHandle}>
            Подтвердить
          </Button>
        </div>
      </div>
    </Container>
  );
};

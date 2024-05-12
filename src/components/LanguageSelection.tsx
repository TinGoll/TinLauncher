import { Avatar, Paper, Stack, Typography, styled } from "@mui/material";
import { FC } from "react";
import { US, RU } from "country-flag-icons/react/3x2";
import { TLanguage, setLanguage } from "@/stores/setting.store";

const Container = styled("div")`
  min-height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 22px;
`;

const Item = styled(Paper)`
  padding: 16px;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: Blur(10px);
  cursor: pointer;
  :hover {
    -webkit-box-shadow: 0px 0px 15px 10px rgba(240, 240, 43, 0.42);
    -moz-box-shadow: 0px 0px 15px 10px rgba(240, 240, 43, 0.42);
    box-shadow: 0px 0px 15px 10px rgba(240, 240, 43, 0.42);
  }
`;

const CountryFlag = styled("div")`
  width: 80px;
  height: auto;
`;

export const LanguageSelection: FC = () => {
  const handleChangeLanguage = (language: TLanguage) => {
    setLanguage(language);
  };
  return (
    <Container>
      <Item onClick={() => handleChangeLanguage("russian")}>
        <Stack spacing={2} direction="row" alignItems="center">
          <CountryFlag>
            <RU title="United States" />
          </CountryFlag>
          <Typography noWrap variant="h3">
            Русский
          </Typography>
        </Stack>
      </Item>

      <Item onClick={() => handleChangeLanguage("english")}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Stack>
            <CountryFlag>
              <US title="United States" />
            </CountryFlag>
          </Stack>
          <Stack sx={{ minWidth: 0 }}>
            <Typography noWrap variant="h3">
              English
            </Typography>
          </Stack>
        </Stack>
      </Item>
    </Container>
  );
};

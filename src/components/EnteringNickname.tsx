import { localisation } from "@/localisation";
import {
  clearLatestNicknames,
  setCurrentNickName,
  useLanguage,
  useLatestNicknamesList,
} from "@/stores/setting.store";
import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
  styled,
} from "@mui/material";
import React, { FC, useState } from "react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Fragment } from "react";

const Container = styled("div")`
  padding: 26px;
  height: 100%;

  & .content {
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: Blur(8px);
    padding: 16px;
    border: 2px solid #3d3d3d;
    border-radius: 8px;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 420px;
    overflow-y: auto;
    input {
      font-size: 26px;
    }

    & .info {
      display: flex;
      justify-content: center;
    }
  }
`;

const checkLatinCharacters = (username: string): boolean => {
  var latinPattern = /^[a-zA-Z]+$/;
  return latinPattern.test(username);
};

export const EnteringNickname: FC = () => {
  const lastNicknames = useLatestNicknamesList();
  const language = useLanguage();
  const [first, ...others] = lastNicknames;

  const [nickname, setNickname] = useState<string>(first || "");
  const [error, setError] = useState<string | null>(null);

  const {
    INPUT_ENTER_NICK_TEXT,
    INPUT_ENTER_NICK_INFO,
    INPUT_ENTER_NICK_BUTTON_TEXT,
    NICKS_OF_LAST_PLAYERS,
    VALIDATE_ERROR_NICKNAME,
  } = localisation(language);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validate = checkLatinCharacters(nickname);
    if (!validate) {
      setError(VALIDATE_ERROR_NICKNAME);
      return;
    }
    setError(null);

    if (nickname) {
      setCurrentNickName(nickname);
    }
  };

  const handleQueckPlay = (nickname: string) => {
    setCurrentNickName(nickname);
  };

  return (
    <Container>
      <div className="content">
        <div className="info">
          <Typography width={600} textAlign="center" variant="body1">
            {INPUT_ENTER_NICK_INFO}
          </Typography>
        </div>
        <div className="input">
          <Box
            onSubmit={handleSubmit}
            component="form"
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-start",
              gap: 2,
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              sx={{ flex: 1 }}
              fullWidth
              label={INPUT_ENTER_NICK_TEXT}
              variant="filled"
            />
            <Button
              size="large"
              variant="contained"
              color="warning"
              type="submit"
            >
              {INPUT_ENTER_NICK_BUTTON_TEXT}
            </Button>
          </Box>
          {error && (
            <div>
              <Typography color="#FF4040" variant="subtitle2" sx={{ mt: 0.5 }}>
                {error}
              </Typography>
            </div>
          )}
        </div>
        {others.length ? (
          <div>
            <Typography sx={{ mb: 0.5, mt: 0 }} variant="overline">
              {NICKS_OF_LAST_PLAYERS}:
            </Typography>
            <div className="list-nicknames">
              <List
                sx={{
                  width: "100%",
                  bgcolor: "rgba(0,0,0,0.3)",
                  p: 1,
                  borderRadius: "6px",
                }}
              >
                {others?.slice(0, 4).map((lastNickname) => (
                  <Fragment key={lastNickname}>
                    <ListItem
                      onClick={() => handleQueckPlay(lastNickname)}
                      sx={{
                        cursor: "pointer",
                        p: "4px",
                        ":hover": {
                          bgcolor: "rgba(200,200,200,0.1)",
                        },
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{ width: 32, height: 32, bgcolor: "#ffea007f" }}
                        >
                          <EmojiEmotionsIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={lastNickname} />
                    </ListItem>
                    <Divider />
                  </Fragment>
                ))}
              </List>
            </div>
          </div>
        ) : null}
      </div>
    </Container>
  );
};

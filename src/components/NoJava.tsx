import { CircularProgress, styled } from "@mui/material";
import { FC } from "react";

const Container = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #03030349;
  font-size: 18px;
  gap: 8px;
  span {
    color: #ff4040;
  }
  & .text {
    padding: 26px;
    backdrop-filter: Blur(8px);
    background: #03030349;
  }
`;

type Props = {
  examination?: boolean;
};

export const NoJava: FC<Props> = ({ examination }) => {
  return (
    <Container>
      {examination ? (
        <CircularProgress />
      ) : (
        <div className="text">
          <span>Java is not installed!</span> Download Java from the official
          site
        </div>
      )}
    </Container>
  );
};

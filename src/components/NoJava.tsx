import { styled } from "@mui/material";
import React, { FC } from "react";

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
    color: red;
  }
  & .text {
    padding: 26px;
    backdrop-filter: Blur(8px);
    background: #03030349;
  }
`;

export const NoJava: FC = () => {
  return (
    <Container>
      <div className="text">
        <span>Java is not installed!</span> Download Java from the official site
      </div>
    </Container>
  );
};

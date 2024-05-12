import styled from "@emotion/styled";
import { PropsWithChildren, FC } from "react";
import bg from "../assets/launcher/minecraft_bg.jpg";
import { useSetting } from "@/stores/setting.store";

const Container = styled.main`
  position: relative;
  height: 100vh;
  width: 100vw;
  & .content {
    position: relative;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
  }
  & .bg {
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

  & .radial {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;

    background: radial-gradient(
      circle,
      rgba(21, 245, 122, 0.1) 20%,
      rgba(0, 0, 0, 0.6) 100%
    );
  }
`;

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Container>
      <div className="bg">
        <img src={bg} alt="background" />
      </div>
      <div className="radial" />
      <div className="content">{children}</div>
    </Container>
  );
};

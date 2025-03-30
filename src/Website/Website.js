import React from "react";
import styled, { css } from "styled-components/macro";
import { Link, Outlet, useLocation } from "react-router-dom";
import Logo from "commons/components/Logo";
import Flexbox from "commons/components/Flexbox";
import { Helmet } from "react-helmet";
import BackgroundImage from "commons/images/background3.jpg"; // webp

const Box = styled.div`
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  color: white;

  &:before {
    content: "";
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    bottom: 0;
    background: linear-gradient(180deg, var(--neutral-80) 0%, var(--primary-70) 100%);
    opacity: 0.9;
  }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: var(--z-index-above);
`;

const Navigation = styled(Flexbox)`
  height: 60px;
  padding: 0 32px;
  width: 100%;
`;

const LogoStyled = styled(Logo)`
  margin-right: auto;
`;

const LinkStyled = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: var(--neutral-180);
  padding: 4px 8px;

  ${({ $isActive }) =>
    $isActive &&
    css`
      color: var(--primary-100);
      font-weight: 700;
    `};
`;

function Website() {
  const location = useLocation();

  return (
    <Box style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <Helmet>
        <title>Recitle</title>
      </Helmet>
      <Header>
        <Navigation alignItems="center">
          <LogoStyled link="/" />
          <LinkStyled to="/archive" $isActive={location.pathname === "/archive"}>
            Archive
          </LinkStyled>
          <LinkStyled to="/help" $isActive={location.pathname === "/help"}>
            How to play
          </LinkStyled>
        </Navigation>
      </Header>
      <Outlet />
    </Box>
  );
}

export default Website;

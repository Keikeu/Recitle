import React, { use, useEffect } from "react";
import styled, { css } from "styled-components/macro";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "commons/components/Logo";
import Flexbox from "commons/components/Flexbox";
import { Helmet } from "react-helmet";
import BackgroundImage from "commons/images/background3.jpg"; // webp
import callLocalStorage from "commons/util/callLocalStorage";
import { useMediaQuery } from "commons/util/useMediaQuery";
import { BREAKPOINTS } from "commons/util/breakpoints";
import Icon from "commons/components/Icon";

const Box = styled.div`
  background-size: cover;
  background-attachment: fixed;
  min-height: 100vh;
  color: white;

  &:before {
    content: "";
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: linear-gradient(180deg, #1e0e1a 0%, #b3535e 100%);
    opacity: 0.6;
  }
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: var(--z-index-above);
`;

const Navigation = styled(Flexbox)`
  height: 80px;
  padding: 0 32px;
  width: 100%;

  @media (max-width: ${BREAKPOINTS.medium}) {
    padding: 0 12px;
    background-color: #301d44;
  }
`;

const LogoStyled = styled(Logo)`
  margin-right: auto;

  @media (max-width: ${BREAKPOINTS.medium}) {
    margin-left: auto;
  }
`;

const LinkStyled = styled(Link)`
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: var(--primary-190);
  background-color: #1e0e1a99;
  padding: 8px 12px;
  border-radius: var(--border-radius-1);

  ${({ $isActive }) =>
    $isActive &&
    css`
      background-color: #68325c99;
    `};

  @media (max-width: ${BREAKPOINTS.medium}) {
    padding: 14px;
  }
`;

function Website() {
  const location = useLocation();
  const navigate = useNavigate();
  const sawHowToPlay = callLocalStorage("sawHowToPlay");

  const isMediumScreen = useMediaQuery(BREAKPOINTS.medium);

  useEffect(() => {
    if (!sawHowToPlay) {
      callLocalStorage("sawHowToPlay", "set", true);
      setTimeout(() => {
        navigate("/help");
      }, 0);
    }
  }, [sawHowToPlay, navigate]);

  if (!sawHowToPlay) {
    return null;
  }

  return (
    <Box style={{ backgroundImage: `url(${BackgroundImage})` }}>
      <Helmet>
        <title>Recitle</title>
      </Helmet>
      <Header>
        <Navigation alignItems="center" gap={8}>
          {isMediumScreen ? (
            <>
              <LinkStyled to="/archive" $isActive={location.pathname === "/archive"}>
                <Icon name="inventory_2" size={20} />
              </LinkStyled>
              <LogoStyled link="/" />
              <LinkStyled to="/help" $isActive={location.pathname === "/help"}>
                <Icon name="help" size={20} />
              </LinkStyled>
            </>
          ) : (
            <>
              <LogoStyled link="/" />
              <LinkStyled to="/archive" $isActive={location.pathname === "/archive"}>
                Archive
              </LinkStyled>
              <LinkStyled to="/help" $isActive={location.pathname === "/help"}>
                How to play
              </LinkStyled>
            </>
          )}
        </Navigation>
      </Header>
      <Outlet />
    </Box>
  );
}

export default Website;

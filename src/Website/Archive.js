import React, { useEffect } from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Typography from "commons/components/Typography";
import { songs } from "data/songs.const";
import callLocalStorage from "commons/util/callLocalStorage";
import { Link } from "react-router-dom";
import Squares from "./components/Squares";
import Icon from "commons/components/Icon";
import { GAME_STATE } from "./Home";
import { useMediaQuery } from "commons/util/useMediaQuery";
import { BREAKPOINTS } from "commons/util/breakpoints";
import { format, isBefore, isEqual, parseISO } from "date-fns";
import { Helmet } from "react-helmet";

const Box = styled.div`
  overflow-x: hidden;
  position: relative;
`;

const Container = styled.main`
  width: 720px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 16px;
`;

const SongBox = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  gap: 16px;
  width: 100%;
  height: 72px;
  padding: 12px;
  padding-left: 20px;
  background-color: #1e0e1a33;
  border-radius: var(--border-radius-2);
  border: 2px solid rgba(255, 0, 255, 0.5);
  backdrop-filter: blur(16px);

  &:hover {
    background-color: #1e0e1a80;
  }
`;

const SongIndex = styled(Typography)`
  width: 32px;
  flex-shrink: 0;
`;

const SongDate = styled(Typography)`
  width: 100px;
  flex-shrink: 0;
`;

const StatusIcon = styled(Icon)`
  margin-left: auto;
  color: #ff00ff;

  &:after {
    content: "";
    display: block;
    width: 100px;
    position: absolute;
    top: -2px;
    bottom: -2px;
    right: -2px;
    border-top-right-radius: var(--border-radius-2);
    border-bottom-right-radius: var(--border-radius-2);
  }

  ${({ $state }) =>
    $state === GAME_STATE.WON &&
    css`
      color: #00ff00;

      &:after {
        background: linear-gradient(90deg, #00ff0000 0%, #00ff0033 100%);
      }
    `}

  ${({ $state }) =>
    $state === GAME_STATE.LOST &&
    css`
      color: var(--red-100);

      &:after {
        background: linear-gradient(90deg, #1e0e1a00 0%, #ff000033 100%);
      }
    `}
`;

function Archive({ className }) {
  const songArchive = callLocalStorage("songArchive");
  const isSmallScreen = useMediaQuery(BREAKPOINTS.medium);

  useEffect(() => {
    window.gtag("event", "view_archive");
  }, []);

  return (
    <>
      <Helmet>
        <title>Archive | Recitle</title>
      </Helmet>
      <Box className={className}>
        <Container>
          <Typography variant={isSmallScreen ? "h3" : "h2"} marginBottom={24} marginTop={isSmallScreen ? 24 : 0}>
            Archive
          </Typography>

          {songs
            .filter(item => {
              const itemDate = parseISO(item.date);
              return isBefore(itemDate, new Date()) || isEqual(itemDate, new Date());
            })
            .map((song, index, array) => {
              const archiveItem = songArchive?.[song.id] || {};
              const maxVerses = song.lyricsOriginal.length;
              return (
                <SongBox key={index} to={`/?id=${song.id}`}>
                  <SongIndex variant="h4">#{array.length - index}</SongIndex>
                  {!isSmallScreen && <SongDate variant="body">{format(new Date(song.date), "PP")}</SongDate>}
                  <Squares
                    maxVerses={maxVerses}
                    steps={archiveItem.state === GAME_STATE.LOST ? archiveItem.steps : archiveItem.steps - 1}
                    state={archiveItem.state}
                  />
                  <StatusIcon
                    name={
                      !archiveItem.state || archiveItem.state === GAME_STATE.PLAYING
                        ? "chevron_right"
                        : archiveItem.state === GAME_STATE.WON
                        ? "check"
                        : "close"
                    }
                    size={24}
                    $state={archiveItem.state}
                  />
                </SongBox>
              );
            })}
        </Container>
      </Box>
    </>
  );
}

Archive.propTypes = {
  className: T.string,
};

export default Archive;

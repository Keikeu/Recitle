import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Typography from "commons/components/Typography";
import Flexbox from "commons/components/Flexbox";
import { GAME_STATE } from "Website/Home";
import Squares from "./Squares";
import { useMediaQuery } from "commons/util/useMediaQuery";
import { BREAKPOINTS } from "commons/util/breakpoints";
import ConfettiExplosion from "react-confetti-explosion";

const Box = styled.div`
  margin: 0 auto;
  padding: 64px 0;
  width: 880px;
  max-width: 100%;
`;

const Paragraph = styled(Typography)`
  white-space: pre-wrap;

  @media (max-width: ${BREAKPOINTS.small}) {
    padding: 0 24px;
  }
`;

const ConfettiExplosionStyled = styled(ConfettiExplosion)`
  position: absolute;
  top: 0;
  left: 50%;
`;

function EndScreen({ className, song, state, steps }) {
  const isSmallScreen = useMediaQuery(BREAKPOINTS.small);

  return (
    <>
      {state === GAME_STATE.WON && <ConfettiExplosionStyled />}
      <Box className={className}>
        <Flexbox alignItems="center" flexDirection="column">
          <Typography variant={isSmallScreen ? "h2" : "h1"} marginBottom={24}>
            {state === GAME_STATE.WON ? "Victory!" : "Game over"}
          </Typography>

          <Squares maxVerses={song.lyricsModified.length} steps={steps - 1} state={state} />

          <Typography variant={isSmallScreen ? "h4" : "h3"} marginTop={68} marginBottom={24}>
            &quot;{song.title}&quot; by {song.artist}
          </Typography>

          <iframe
            width={isSmallScreen ? "320" : "680"}
            height={isSmallScreen ? "200" : "400"}
            src={song.link}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Flexbox>

        <Flexbox flexDirection="column" gap={40} marginTop={56}>
          {isSmallScreen ? (
            <>
              <Paragraph variant="h4">{song.style} style</Paragraph>
              {song.lyricsOriginal.map((_, index) => (
                <Paragraph key={index} variant="paragraph">
                  {song.lyricsModified[index]}
                </Paragraph>
              ))}
              <Paragraph variant="h4" marginTop={40}>
                Original
              </Paragraph>
              {song.lyricsOriginal.map((_, index) => (
                <Paragraph key={index} variant="paragraph">
                  {song.lyricsOriginal[index]}
                </Paragraph>
              ))}
            </>
          ) : (
            <>
              <Flexbox gap={40}>
                <Paragraph variant="h4">{song.style} style</Paragraph>
                <Paragraph variant="h4">Original</Paragraph>
              </Flexbox>
              {song.lyricsOriginal.map((_, index) => (
                <Flexbox gap={40} key={index}>
                  <Paragraph variant="paragraph">{song.lyricsModified[index]}</Paragraph>
                  <Paragraph variant="paragraph">{song.lyricsOriginal[index]}</Paragraph>
                </Flexbox>
              ))}
            </>
          )}
        </Flexbox>
      </Box>
    </>
  );
}

EndScreen.propTypes = {
  className: T.string,
  song: T.shape({
    id: T.string,
    title: T.string,
    artist: T.string,
    lyricsOriginal: T.arrayOf(T.string),
    lyricsModified: T.arrayOf(T.string),
    link: T.string,
    date: T.string,
    style: T.string,
  }),
  state: T.string,
  steps: T.number,
};

export default EndScreen;

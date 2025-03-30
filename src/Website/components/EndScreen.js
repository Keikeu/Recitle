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
import Button from "commons/components/Button";
import { useToast } from "commons/util/useToast";

const Box = styled.div`
  margin: 0 auto;
  padding: 64px 0;
  width: 880px;
  max-width: 100%;
`;

const SquaresStyled = styled(Squares)`
  margin-bottom: 24px;
`;

const Paragraph = styled(Typography)`
  width: 100%;
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

const LyricsWrap = styled(Flexbox)`
  border-radius: var(--border-radius-3);
  border: 4px solid rgba(255, 0, 255, 0.5);
  padding: 16px;
  backdrop-filter: blur(16px);
`;

function EndScreen({ className, song, state, steps }) {
  const { showToast } = useToast();
  const isSmallScreen = useMediaQuery(BREAKPOINTS.small);

  const maxVerses = song.lyricsModified.length;
  const stepsToDisplay = state === GAME_STATE.LOST ? steps : steps - 1;

  function copyToClipboard() {
    navigator.clipboard
      .writeText(
        `Recitle ${song.number}: ${steps}/${maxVerses} 
${Array.from({ length: maxVerses })
  .map((_, index) => {
    return index < stepsToDisplay ? "🟥" : index === stepsToDisplay && state === GAME_STATE.WON ? "🟩" : "⬜";
  })
  .join("")}`
      )
      .then(() => {
        showToast("Copied to clipboard");
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  }

  return (
    <>
      {state === GAME_STATE.WON && <ConfettiExplosionStyled />}
      <Box className={className}>
        <Flexbox alignItems="center" flexDirection="column">
          <Typography variant={isSmallScreen ? "h2" : "h1"} marginBottom={24}>
            {state === GAME_STATE.WON ? "Victory!" : "Game over"}
          </Typography>

          <SquaresStyled maxVerses={maxVerses} steps={stepsToDisplay} state={state} />

          <Button icon="share" onClick={copyToClipboard}>
            Share
          </Button>

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

        <LyricsWrap flexDirection="column" gap={40} marginTop={56}>
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
              <Flexbox gap={24}>
                <Paragraph variant="h4">{song.style} style</Paragraph>
                <Paragraph variant="h4">Original</Paragraph>
              </Flexbox>
              {song.lyricsOriginal.map((_, index) => (
                <Flexbox gap={24} key={index}>
                  <Paragraph variant="paragraph">{song.lyricsModified[index]}</Paragraph>
                  <Paragraph variant="paragraph">{song.lyricsOriginal[index]}</Paragraph>
                </Flexbox>
              ))}
            </>
          )}
        </LyricsWrap>
      </Box>
    </>
  );
}

EndScreen.propTypes = {
  className: T.string,
  song: T.shape({
    id: T.string,
    number: T.number,
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

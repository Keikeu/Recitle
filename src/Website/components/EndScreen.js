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
import Countdown from "react-countdown";
import { addDays, startOfDay } from "date-fns";
import { Link } from "react-router-dom";

const Box = styled.div`
  margin: 0 auto;
  padding: 64px 24px;
  width: 1024px;
  max-width: 100%;

  @media (max-width: ${BREAKPOINTS.medium}) {
    padding: 24px 16px;
  }
`;

const SquaresStyled = styled(Squares)`
  margin-bottom: 16px;
`;

const SongDescription = styled(Typography)`
  text-align: center;
  line-height: 1.8;

  margin-top: 64px;
  margin-bottom: 24px;

  @media (max-width: ${BREAKPOINTS.medium}) {
    margin-top: 40px;
    margin-bottom: 12px;
  }
`;

const Paragraph = styled(Typography)`
  width: 100%;
  white-space: pre-wrap;
`;

const ConfettiExplosionStyled = styled(ConfettiExplosion)`
  position: absolute;
  top: 0;
  left: 50%;
`;

const CountdownBox = styled.div`
  text-align: center;
  margin-top: 56px;
  margin-bottom: 56px;

  @media (max-width: ${BREAKPOINTS.medium}) {
    margin-top: 32px;
  }
`;

const TextLink = styled(Link)`
  text-decoration: underline;
`;

const LyricsWrap = styled(Flexbox)`
  border-radius: var(--border-radius-3);
  border: 4px solid rgba(255, 0, 255, 0.5);
  padding: 16px;
  backdrop-filter: blur(16px);

  @media (max-width: ${BREAKPOINTS.medium}) {
    padding: 24px;
  }
`;

function EndScreen({ className, song, state, steps }) {
  const { showToast } = useToast();
  const isScreenMaxMedium = useMediaQuery(BREAKPOINTS.medium);

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
  .join("")}
	
https://karolina.place/Recitle?id=${song.id}`
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
          <Typography variant={isScreenMaxMedium ? "h2" : "h1"} marginBottom={24}>
            {state === GAME_STATE.WON ? "Victory!" : "Game over"}
          </Typography>

          <SquaresStyled maxVerses={maxVerses} steps={stepsToDisplay} state={state} />

          <Button icon="share" onClick={copyToClipboard}>
            Share
          </Button>

          <SongDescription variant={isScreenMaxMedium ? "h4" : "h3"}>
            &quot;{song.title}&quot; <br />
            by {song.artist} <br />
            in {song.style} style
          </SongDescription>

          <iframe
            width={isScreenMaxMedium ? "320" : "680"}
            height={isScreenMaxMedium ? "200" : "400"}
            src={song.link}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </Flexbox>

        <CountdownBox>
          <Typography variant="paragraph">Next Recitle in:</Typography>
          <Typography variant="mono">
            <Countdown date={startOfDay(addDays(new Date(), 1))} daysInHours />
          </Typography>
          <Typography variant="body" marginTop={16}>
            Can&apos;t wait? Head to the <TextLink to="/archive">Archive</TextLink> for more!
          </Typography>
        </CountdownBox>

        <LyricsWrap flexDirection="column" gap={40}>
          {isScreenMaxMedium ? (
            <>
              <Paragraph variant="h4">Original vs {song.style}</Paragraph>
              {song.lyricsModified.map((_, verseIndex) => (
                <div key={verseIndex}>
                  {song.lyricsModified[verseIndex].split(/\n/).map((_, lineIndex) => (
                    <div key={lineIndex}>
                      <Paragraph variant="paragraph">
                        {song.lyricsOriginal[verseIndex].split(/\n/)[lineIndex]}
                      </Paragraph>
                      <Paragraph variant="paragraph" color="primary-170" marginBottom={24}>
                        <i>{song.lyricsModified[verseIndex].split(/\n/)[lineIndex]}</i>
                      </Paragraph>
                    </div>
                  ))}
                </div>
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

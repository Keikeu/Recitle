import React, { useCallback, useEffect } from "react";
import styled from "styled-components/macro";
import Typography from "commons/components/Typography";
import { BREAKPOINTS } from "commons/util/breakpoints";
import { songs } from "data/songs.const";
import Flexbox from "commons/components/Flexbox";
import Button from "commons/components/Button";
import Combobox from "commons/components/Combobox";
import { songOptions } from "data/songOptions";
import Skeleton from "commons/components/Skeleton/Skeleton";
import callLocalStorage from "commons/util/callLocalStorage";
import { useSearchParams } from "react-router-dom";
import EndScreen from "./components/EndScreen";
import Squares from "./components/Squares";

const Box = styled.div`
  position: relative;

  @media (max-width: ${BREAKPOINTS.medium}) {
    background-image: none;
  }
`;

const Container = styled.main`
  max-width: 100%;
  margin: 0 auto;
  position: relative;
`;

const GuessSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  width: calc(680px + 32px);
  padding: 32px 16px;
  margin: 0 auto;
  z-index: var(--z-index-above);
`;

const ComboboxStyled = styled(Combobox)`
  width: 100%;
`;

const LyricsSection = styled.section`
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 40px 0;
  height: calc(100vh - 60px - 144px);
  overflow-y: auto;
`;

const LyricsWrap = styled(Flexbox)`
  width: 680px;
  margin: 0 auto;
`;

const Paragraph = styled(Typography)`
  white-space: pre;
`;

export const GAME_STATE = {
  PLAYING: "playing",
  WON: "won",
  LOST: "lost",
};

function Home() {
  const [searchParams] = useSearchParams();
  const songId = searchParams.get("id");

  const songArchive = callLocalStorage("songArchive");

  const currentSong = songId
    ? songs.find(song => song.id === songId)
    : songs.find(song => song.date === new Date().toLocaleDateString("en-gb"));
  const { id, lyricsModified } = currentSong;
  const maxVerses = lyricsModified.length;
  const wasPlayed = songArchive && songArchive[id];

  const [step, setStep] = React.useState(0);
  const [guess, setGuess] = React.useState("");
  const [gameState, setGameState] = React.useState(GAME_STATE.PLAYING);

  useEffect(() => {
    if (wasPlayed) {
      setStep(songArchive[id]?.steps);
      setGameState(songArchive[id]?.state);
    }
  }, [wasPlayed, songArchive, id]);

  const saveGameState = useCallback(
    (stateToSave, stepToSave) => {
      callLocalStorage("songArchive", "set", {
        ...songArchive,
        [id]: {
          state: stateToSave,
          steps: stepToSave,
        },
      });
    },
    [step]
  );

  function handleGuess() {
    const newStep = step + 1;
    let newState;

    if (guess === id) {
      newState = GAME_STATE.WON;
    } else if (step === maxVerses - 1) {
      newState = GAME_STATE.LOST;
    } else {
      newState = GAME_STATE.PLAYING;
    }

    setGameState(newState);
    setStep(newStep);
    saveGameState(newState, newStep);
    setGuess("");
  }

  function handleSkip() {
    const newStep = step + 1;
    let newState;

    if (newStep === maxVerses) {
      newState = GAME_STATE.LOST;
    } else {
      newState = GAME_STATE.PLAYING;
    }

    setGameState(newState);
    setStep(newStep);
    saveGameState(newState, newStep);
  }

  return (
    <Box>
      <Container>
        {gameState === GAME_STATE.PLAYING && (
          <GuessSection>
            <Flexbox gap={12} style={{ width: "100%" }}>
              <Button variant="tertiary" onClick={handleSkip} disabled={step >= maxVerses}>
                Skip
              </Button>
              <ComboboxStyled
                value={guess}
                onChange={songId => setGuess(songId)}
                placeholder="Search for a song..."
                options={songOptions}
              />
              <Button onClick={handleGuess} disabled={step >= maxVerses || !guess}>
                Submit
              </Button>
            </Flexbox>
            <Flexbox gap={12}>
              <Squares maxVerses={maxVerses} steps={step} state={gameState} />
            </Flexbox>
          </GuessSection>
        )}
        {gameState !== GAME_STATE.PLAYING && <EndScreen song={currentSong} state={gameState} steps={step} />}
        {gameState === GAME_STATE.PLAYING && (
          <LyricsSection>
            <LyricsWrap flexDirection="column" gap={24}>
              {lyricsModified.map((verse, verseIndex) => (
                <React.Fragment key={verseIndex}>
                  {verseIndex <= step ? (
                    <Paragraph variant="paragraph">{verse}</Paragraph>
                  ) : (
                    <Flexbox flexDirection="column" gap={12} paddingY={6}>
                      {verse.split(/\n/).map((line, lineIndex) => (
                        <Skeleton key={lineIndex} width={`${line.length * 7}px`} height="18px" />
                      ))}
                    </Flexbox>
                  )}
                </React.Fragment>
              ))}
            </LyricsWrap>
          </LyricsSection>
        )}
      </Container>
    </Box>
  );
}

export default Home;

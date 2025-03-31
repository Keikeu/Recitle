import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components/macro";
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
import { useMediaQuery } from "commons/util/useMediaQuery";
import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";

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
  display: flex;
  flex-direction: column;

  @media (max-width: ${BREAKPOINTS.medium}) {
    flex-direction: column-reverse;
  }
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

  @media (max-width: ${BREAKPOINTS.medium}) {
    width: 100%;
    padding: 24px;
  }
`;

const ComboboxStyled = styled(Combobox)`
  width: 100%;
`;

const LyricsSection = styled.section`
  position: relative;
  width: 100%;
  margin: 0 auto;
  padding: 40px 0;
  height: calc(100vh - 80px - 144px);
  overflow-y: auto;

  @media (max-width: ${BREAKPOINTS.medium}) {
    padding-left: 24px;
    padding-right: 24px;
    height: calc(100vh - 80px - 176px);
  }
`;

const LyricsWrap = styled(Flexbox)`
  width: 680px;
  max-width: 100%;
  margin: 0 auto;
`;

const Paragraph = styled(motion.p)`
  font-size: 18px;
  line-height: 30px;
  white-space: pre;

  @media (max-width: ${BREAKPOINTS.medium}) {
    white-space: pre-wrap;
  }
`;

export const GAME_STATE = {
  PLAYING: "playing",
  WON: "won",
  LOST: "lost",
};

function Home() {
  const isMediumScreen = useMediaQuery(BREAKPOINTS.medium);
  const [searchParams] = useSearchParams();
  const songId = searchParams.get("id");

  const songArchive = callLocalStorage("songArchive");

  const currentSong = songId
    ? songs.find(song => song.id === songId)
    : songs.find(song => song.date === format(new Date(), "yyyy-MM-dd"));
  const { id, lyricsModified } = currentSong;
  const maxVerses = lyricsModified.length;
  const wasPlayed = songArchive && songArchive[id];

  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(0);
  const [guess, setGuess] = useState("");
  const [gameState, setGameState] = useState(GAME_STATE.PLAYING);

  useEffect(() => {
    if (wasPlayed) {
      setStep(songArchive[id]?.steps);
      setGameState(songArchive[id]?.state);
    }
    setLoading(false);
  }, [wasPlayed, songArchive, id]);

  const lyricsRefs = useRef([]);
  useEffect(() => {
    if (lyricsRefs.current[step]) {
      lyricsRefs.current[step].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [step]);

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
    if (!guess) {
      return;
    }

    const newStep = step + 1;
    let newState;

    if (guess === id) {
      newState = GAME_STATE.WON;
    } else if (step === maxVerses - 1) {
      newState = GAME_STATE.LOST;
    } else {
      newState = GAME_STATE.PLAYING;
    }

    saveGameState(newState, newStep);
    setGameState(newState);
    setStep(newStep);
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

    saveGameState(newState, newStep);
    setGameState(newState);
    setStep(newStep);
  }

  if (loading) {
    return null;
  }

  return (
    <Box>
      <Container>
        {gameState === GAME_STATE.PLAYING && (
          <GuessSection>
            {isMediumScreen && (
              <>
                <Squares maxVerses={maxVerses} steps={step} state={gameState} />
                <ComboboxStyled
                  value={guess}
                  onChange={songId => setGuess(songId)}
                  placeholder="Search for a song..."
                  options={songOptions.sort((a, b) => a.label.localeCompare(b.label))}
                />
              </>
            )}
            <Flexbox gap={12} style={{ width: "100%" }}>
              <Button variant="tertiary" onClick={handleSkip} fullWidth={isMediumScreen}>
                Skip
              </Button>
              {!isMediumScreen && (
                <ComboboxStyled
                  value={guess}
                  onChange={songId => setGuess(songId)}
                  placeholder="Search for a song..."
                  options={songOptions.sort((a, b) => a.label.localeCompare(b.label))}
                />
              )}
              <Button onClick={handleGuess} fullWidth={isMediumScreen}>
                Submit
              </Button>
            </Flexbox>
            {!isMediumScreen && <Squares maxVerses={maxVerses} steps={step} state={gameState} />}
          </GuessSection>
        )}
        {gameState !== GAME_STATE.PLAYING && <EndScreen song={currentSong} state={gameState} steps={step} />}
        {gameState === GAME_STATE.PLAYING && (
          <LyricsSection>
            <LyricsWrap flexDirection="column" gap={24}>
              <AnimatePresence mode="sync">
                {lyricsModified.map((verse, verseIndex) => (
                  <div key={verseIndex} ref={el => (lyricsRefs.current[verseIndex] = el)}>
                    {verseIndex <= step ? (
                      <Paragraph
                        key={verseIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {verse}
                      </Paragraph>
                    ) : (
                      <Flexbox
                        key={verseIndex}
                        as={motion.div}
                        flexDirection="column"
                        gap={12}
                        paddingY={6}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {verse.split(/\n/).map((line, lineIndex) => (
                          <Skeleton key={lineIndex} width={`${line.length * 7}px`} height="18px" />
                        ))}
                      </Flexbox>
                    )}
                  </div>
                ))}
              </AnimatePresence>
            </LyricsWrap>
          </LyricsSection>
        )}
      </Container>
    </Box>
  );
}

export default Home;

import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Button from "commons/components/Button";
import Typography from "commons/components/Typography";
import Flexbox from "commons/components/Flexbox";

const Box = styled.div`
  overflow-x: hidden;
  position: relative;
`;

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 680px;
  max-width: 100%;
  margin: 0 auto 40px;
  padding: 0 32px;
`;

const InstructionBox = styled(Flexbox)`
  border-radius: var(--border-radius-3);
  border: 4px solid rgba(255, 0, 255, 0.5);
  backdrop-filter: blur(16px);
  margin-bottom: 32px;
`;

function HowToPlay({ className }) {
  return (
    <Box className={className}>
      <Container>
        <Typography variant="h2" marginY={32}>
          How to play
        </Typography>

        <InstructionBox flexDirection="column" padding={16}>
          <Typography variant="h4" marginBottom={8}>
            Guess the Song
          </Typography>
          <Typography variant="paragraph" marginBottom={32}>
            You will be given a paraphrased version of a song&apos;s lyrics. <br />
            Try to guess the song based on the clues.
          </Typography>

          <Typography variant="h4" marginBottom={8}>
            Uncover More Verses
          </Typography>
          <Typography variant="paragraph" marginBottom={32}>
            After each guess, one more verse of the song will be revealed.
          </Typography>

          <Typography variant="h4" marginBottom={8}>
            Skip a Verse
          </Typography>
          <Typography variant="paragraph" marginBottom={32}>
            If you&apos;re stuck, you can skip to the next verse.
          </Typography>

          <Typography variant="h4" marginBottom={8}>
            Win or Lose
          </Typography>
          <Typography variant="paragraph">
            If you guess the song correctly, you win! <br />
            If you run out of verses without guessing, you lose.
          </Typography>
        </InstructionBox>
        <Button link="/" size="large">
          Play now
        </Button>
      </Container>
    </Box>
  );
}

HowToPlay.propTypes = {
  className: T.string,
};

export default HowToPlay;

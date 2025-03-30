import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import Button from "commons/components/Button";
import Typography from "commons/components/Typography";

const Box = styled.div`
  overflow-x: hidden;
  position: relative;
`;

const Container = styled.main`
  width: 680px;
  max-width: 100%;
  margin: 0 auto;
  padding: 0 32px;
`;

function HowToPlay({ className }) {
  return (
    <Box className={className}>
      <Container>
        <Typography variant="h1">How to play</Typography>
        <Typography variant="paragraph" marginY={16}>
          Your goal is to guess the song which lyrics were paraphrased by an LLM.
          <br />
          After each guess, you uncover one more verse.
          <br />
          You can also skip to the next verse.
          <br />
          If you guess correctly, you win! If you run out of verses, you lose.
          <br />
          Have fun!
        </Typography>
        <Button link="/">Play now</Button>
      </Container>
    </Box>
  );
}

HowToPlay.propTypes = {
  className: T.string,
};

export default HowToPlay;

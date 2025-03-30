import React from "react";
import styled from "styled-components/macro";
import Button from "commons/components/Button";
import Typography from "commons/components/Typography";
import { BREAKPOINTS } from "commons/util/breakpoints";
import { useMediaQuery } from "commons/util/useMediaQuery";

const Box = styled.div`
  padding: 144px;
  height: 100vh;
  background-position: bottom;
  background-size: cover;

  @media (max-width: ${BREAKPOINTS.medium}) {
    padding: 80px;
  }

  @media (max-width: ${BREAKPOINTS.small}) {
    padding: 56px 32px;
  }
`;

const Subtitle = styled(Typography)`
  font-weight: 500;
`;

function Page404() {
  const isScreenMaxMedium = useMediaQuery(BREAKPOINTS.medium);

  return (
    <Box>
      <Typography variant={isScreenMaxMedium ? "h3" : "h1"} color="neutral-200" marginBottom={16}>
        Looks like you&apos;re lost
      </Typography>
      <Subtitle variant="paragraph" color="neutral-200" marginBottom={isScreenMaxMedium ? 16 : 32}>
        The page you are looking for does not exist.
      </Subtitle>
      <Button link="/" size={isScreenMaxMedium ? "small" : "medium"}>
        Go to homepage
      </Button>
    </Box>
  );
}

export default Page404;

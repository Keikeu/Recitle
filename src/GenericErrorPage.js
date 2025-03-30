import React from "react";
import styled from "styled-components/macro";
import ErrorPNG from "commons/images/wineSpill.png"; // change later
import Button from "commons/components/Button";
import Typography from "commons/components/Typography";
import { BREAKPOINTS } from "commons/util/breakpoints";
import { useMediaQuery } from "commons/util/useMediaQuery";
import { useNavigate } from "react-router-dom";
import Flexbox from "commons/components/Flexbox";

const Box = styled.div`
  padding: 144px;
  height: 100vh;
  background-position: bottom;
  background-size: cover;
  background: linear-gradient(180deg, var(--secondary-190) 0%, var(--neutral-200) 100%);

  @media (max-width: ${BREAKPOINTS.medium}) {
    padding: 80px;
  }

  @media (max-width: ${BREAKPOINTS.small}) {
    padding: 56px 32px;
  }
`;

const AnchorLink = styled.a`
  font-weight: 500;
  color: var(--primary-100);
`;

function GenericErrorPage() {
  const isScreenMaxMedium = useMediaQuery(BREAKPOINTS.medium);

  const navigate = useNavigate();

  return (
    <Box>
      <img src={ErrorPNG} alt="Wine spilled on the carpet, illustration" width={180} />
      <Typography variant={isScreenMaxMedium ? "h3" : "h2"} marginY={16}>
        Something went wrong
      </Typography>
      <Typography variant="paragraph" marginBottom={isScreenMaxMedium ? 16 : 32}>
        Sorry, that&apos;s our bad. We were notified of the error and are working to fix it.
        <br />
        Please try again in a few moments.
        <br />
        <br />
        If the problem persists,
        <AnchorLink href="/contact" target="_blank">
          let us know.
        </AnchorLink>
      </Typography>
      <Flexbox gap={16}>
        <Button onClick={() => navigate(0)} size={isScreenMaxMedium ? "small" : "medium"} variant="primary">
          Refresh
        </Button>
        <Button link="/" size={isScreenMaxMedium ? "small" : "medium"} variant="secondary">
          Go to homepage
        </Button>
      </Flexbox>
    </Box>
  );
}

export default GenericErrorPage;

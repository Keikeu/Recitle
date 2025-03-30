import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";
import { BREAKPOINTS } from "commons/util/breakpoints";

const LogoLink = styled(Link)`
  font-family: "Protest Strike";
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  letter-spacing: 1.5px;
  color: var(--neutral-200);
  text-shadow: 0px 2px 4px rgba(255, 0, 255, 1), 0px 0px 1px rgba(255, 0, 255, 1);
  text-transform: uppercase;

  &:first-letter {
    font-size: 40px;
  }

  @media (max-width: ${BREAKPOINTS.small}) {
    font-size: 24px;

    &:first-letter {
      font-size: 32px;
    }
  }
`;

function Logo({ className, link }) {
  return (
    <LogoLink className={className} to={link}>
      Recitle
    </LogoLink>
  );
}

Logo.propTypes = {
  className: T.string,
  link: T.string,
};

export default Logo;

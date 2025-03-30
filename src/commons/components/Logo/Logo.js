import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";
import { Link } from "react-router-dom";

const LogoLink = styled(Link)`
  display: flex;
  gap: 8px;
  align-items: center;
  font-family: "Protest Strike";
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  letter-spacing: 0.1em;
  color: var(--neutral-200);
  text-shadow: 0px 2px 4px rgba(255, 0, 255, 0.8), 0px 0px 1px rgba(255, 0, 255, 1);
`;

function Logo({ className, link }) {
  return (
    <LogoLink className={className} to={link}>
      <span className="logo-text">RECITLE</span>
    </LogoLink>
  );
}

Logo.propTypes = {
  className: T.string,
  link: T.string,
};

export default Logo;

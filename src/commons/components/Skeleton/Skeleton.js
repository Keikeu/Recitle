import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";

const Box = styled.div`
  position: relative;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: var(--border-radius-2);
  width: ${({ width }) => width};
  max-width: 100%;
  height: ${({ height }) => height};
  flex-shrink: 0;
  overflow: hidden;
`;

function Skeleton({ className, width, height }) {
  return <Box className={className} width={width} height={height} />;
}

Skeleton.propTypes = {
  className: T.string,
  width: T.string.isRequired,
  height: T.string.isRequired,
};

export default Skeleton;

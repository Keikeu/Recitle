import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";

const Box = styled.div`
  height: 1px;
  width: 100%;
  background-color: var(--neutral-180);
  flex-shrink: 0;
`;

function Divider({ className }) {
  return <Box className={className} />;
}

Divider.propTypes = {
  className: T.string,
};

export default Divider;

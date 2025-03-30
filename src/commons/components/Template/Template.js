import React from "react";
import T from "prop-types";
import styled from "styled-components/macro";

const Box = styled.div``;

function Template({ className }) {
  return <Box className={className}>Template</Box>;
}

Template.propTypes = {
  className: T.string,
};

export default Template;

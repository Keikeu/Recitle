import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";

const Span = styled.span`
  display: block;
  font-size: ${({ size }) => (size ? `${size}px` : "inherit")};
  color: ${({ color }) => color && `var(--${color})`};
  flex-shrink: 0;
  user-select: none;

  ${({ onClick }) =>
    onClick &&
    css`
      cursor: pointer;
    `}

  ${({ isFilled }) =>
    isFilled &&
    css`
      font-variation-settings: "FILL" 1;
    `}
`;

function Icon({ className, name, size, color, onClick, isFilled = false }) {
  return (
    <Span
      size={size}
      color={color}
      className={`material-symbols-rounded${className ? ` ${className}` : ""}`}
      onClick={onClick}
      isFilled={isFilled}
      translate="no"
    >
      {name}
    </Span>
  );
}

Icon.propTypes = {
  className: T.string,
  name: T.string,
  size: T.number,
  color: T.string,
  onClick: T.func,
  isFilled: T.bool,
};

export default Icon;

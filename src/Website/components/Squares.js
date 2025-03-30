import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Flexbox from "commons/components/Flexbox";
import { GAME_STATE } from "Website/Home";

const SquareWrap = styled(Flexbox)`
  gap: 4px;
  /* width: 100%; */
`;

const Square = styled.div`
  width: 24px;
  height: 24px;
  background-color: var(--neutral-200);
  display: inline-block;
  margin-right: 4px;
  color: var(--neutral-900);
  border-radius: var(--border-radius-1);

  ${({ $color }) =>
    $color === "green" &&
    css`
      background-color: var(--green-100);
    `}

  ${({ $color }) =>
    $color === "red" &&
    css`
      background-color: var(--red-100);
    `}

  ${({ $color }) =>
    $color === "grey" &&
    css`
      background-color: var(--neutral-120);
    `}

  ${({ $color }) =>
    $color === "empty" &&
    css`
      background-color: var(--neutral-180);
    `}
`;

function Squares({ className, maxVerses, steps, state }) {
  function getSquareColor(index, steps, state) {
    if (index < steps) {
      return "red";
    }
    if (index === steps && state === GAME_STATE.WON) {
      return "green";
    }
    if (index >= steps && (state === GAME_STATE.WON || state === GAME_STATE.LOST)) {
      return "grey";
    }
    return "empty";
  }

  return (
    <SquareWrap className={className}>
      {Array.from({ length: maxVerses }).map((_, paragraphIndex) => (
        <Square key={paragraphIndex} $color={getSquareColor(paragraphIndex, steps, state)} />
      ))}
    </SquareWrap>
  );
}

Squares.propTypes = {
  className: T.string,
  maxVerses: T.number.isRequired,
  steps: T.number,
  state: T.string,
};

export default Squares;

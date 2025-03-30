import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Icon from "commons/components/Icon";
import Flexbox from "commons/components/Flexbox";
import Typography from "commons/components/Typography";
import { useState } from "react";
import { useEnterKeyPress } from "commons/util/useEnterKeyPress";

const Box = styled(Flexbox)`
  margin: 8px;
  padding: 8px 16px 8px 8px;
  color: var(--neutral-120);
  border-radius: var(--border-radius-1);
  cursor: pointer;

  &:hover,
  &:focus-visible {
    color: var(--neutral-100);
    background-color: var(--neutral-190);
  }

  ${({ isActive }) =>
    isActive &&
    css`
      color: var(--primary-100);
      background-color: var(--primary-190);
      font-weight: 500;

      &:hover,
      &:focus-visible {
        color: var(--primary-100);
        background-color: var(--primary-180);
      }
    `}

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      color: var(--neutral-170);
    `}
`;

const StyledIcon = styled(Icon)`
  margin-right: 8px;
`;

function OptionListItem({ className, id, icon, label, disabled, onClick = () => {}, isActive }) {
  const [clickableElement, setClickableElement] = useState();
  useEnterKeyPress(clickableElement, onClick);

  return (
    <Box
      className={className}
      disabled={disabled}
      tabIndex={disabled ? "-1" : "0"}
      onClick={e => onClick(e, id)}
      ref={setClickableElement}
      isActive={isActive}
    >
      {icon && <StyledIcon name={icon} size={20} />}
      <Typography variant="label">{label}</Typography>
    </Box>
  );
}

OptionListItem.propTypes = {
  className: T.string,
  id: T.string,
  icon: T.string,
  label: T.string,
  disabled: T.bool,
  onClick: T.func,
  isActive: T.bool,
};

export default OptionListItem;

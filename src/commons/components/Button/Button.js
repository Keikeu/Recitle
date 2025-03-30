import React, { forwardRef } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components/macro";
import T from "prop-types";
import Icon from "commons/components/Icon";

const buttonStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius-1);
  width: fit-content;
  font-weight: 500;
  font-family: "Roboto", sans-serif;
  white-space: nowrap;

  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      cursor: default;
    `}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  ${({ variant }) =>
    variant === "primary" &&
    css`
      color: var(--neutral-200);
      background-color: var(--primary-100);

      ${({ disabled }) => {
        if (disabled) {
          return css`
            background-color: var(--primary-140);
          `;
        } else {
          return css`
            &:hover,
            &:focus-visible {
              background-color: var(--primary-90);
            }
            &:active {
              background-color: var(--primary-70);
            }
          `;
        }
      }}
    `}

  ${({ variant }) =>
    variant === "secondary" &&
    css`
      color: var(--primary-100);
      background-color: var(--primary-190);

      ${({ disabled }) => {
        if (disabled) {
          return css`
            background-color: var(--primary-190);
            color: var(--primary-140);
            svg {
              fill: var(--primary-140);
            }
          `;
        } else {
          return css`
            &:hover,
            &:focus-visible {
              background-color: var(--primary-180);
            }
            &:active {
              background-color: var(--primary-170);
            }
          `;
        }
      }}
    `}

  ${({ variant }) =>
    variant === "tertiary" &&
    css`
      color: var(--primary-100);
      font-weight: 500;
      background-color: var(--primary-170);

      ${({ disabled }) => {
        if (disabled) {
          return css`
            background-color: var(--primary-140);
            svg {
              fill: var(--neutral-170);
            }
          `;
        } else {
          return css`
            &:hover,
            &:focus-visible {
              background-color: var(--primary-140);
              color: var(--primary-70);
            }
            &:active {
              background-color: var(--primary-100);
              color: var(--primary-70);
            }
          `;
        }
      }}
    `}

  ${({ size, $isIconOnly }) =>
    size === "small" &&
    css`
      padding: ${$isIconOnly ? 6 : 8}px; // line height is 16px, icon size is 20px, gotta fix the difference
      font-size: 14px;
      line-height: 16px;
    `}

  ${({ size }) =>
    size === "medium" &&
    css`
      padding: 10px;
      font-size: 16px;
      line-height: 20px;
    `}

  ${({ size }) =>
    size === "large" &&
    css`
      padding: 14px;
      font-size: 16px;
      line-height: 20px;
    `}
`;

const ButtonBox = styled.button`
  ${buttonStyle};
`;

const LinkBox = styled(Link)`
  ${buttonStyle};
`;

const IconStyled = styled(Icon)`
  ${({ isHidden }) =>
    isHidden &&
    css`
      visibility: hidden;
      opacity: 0;
    `}
`;

const Label = styled.div`
  ${({ isHidden }) =>
    isHidden &&
    css`
      visibility: hidden;
      opacity: 0;
    `}

  ${({ size }) =>
    size === "small" &&
    css`
      padding: 0 4px;
    `}

  ${({ size }) =>
    size === "medium" &&
    css`
      padding: 0 6px;
    `}

  ${({ size }) =>
    size === "large" &&
    css`
      padding: 0 8px;
    `}
`;

// eslint-disable-next-line react/display-name
const Button = forwardRef(
  (
    {
      className,
      children,
      icon,
      isIconFilled,
      onClick,
      link,
      size = "medium",
      variant = "primary",
      fullWidth,
      ariaLabel,
      disabled,
      loading,
    },
    ref
  ) => {
    const isIconOnly = !children && icon;
    const iconSize = isIconOnly ? 20 : 16;

    const commonProps = {
      className,
      size,
      variant,
      $fullWidth: fullWidth,
      $isIconOnly: isIconOnly,
      disabled: loading ? true : disabled,
      ref,
      "aria-label": ariaLabel,
      "aria-disabled": disabled,
    };

    const content = (
      <>
        {icon && <IconStyled name={icon} size={iconSize} isFilled={isIconFilled} isHidden={loading} />}
        {children && (
          <Label size={size} isHidden={loading}>
            {children}
          </Label>
        )}
      </>
    );

    return (
      <>
        {link ? (
          <LinkBox to={link} {...commonProps}>
            {content}
          </LinkBox>
        ) : (
          <ButtonBox onClick={onClick} type="button" {...commonProps}>
            {content}
          </ButtonBox>
        )}
      </>
    );
  }
);

Button.propTypes = {
  className: T.string,
  children: T.oneOfType([T.object, T.string, T.node]),
  icon: T.string,
  isIconFilled: T.bool,
  onClick: T.func,
  link: T.string,
  size: T.oneOf(["small", "medium", "large"]),
  variant: T.oneOf(["primary", "secondary", "tertiary"]),
  fullWidth: T.bool,
  ariaLabel: T.string,
  disabled: T.bool,
  loading: T.bool,
};

export default Button;

import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import { calculateSpacingValue } from "commons/util/helpers";

const variantsMapping = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  paragraph: "p",
  label: "span",
  timer: "span",
  mono: "span",
};

const StyledComponent = styled.div`
  color: ${({ color }) => (color ? `var(--${color})` : "inherit")};
  margin: ${({ margin }) => margin && margin};

  ${({ variant }) =>
    variant === "h1" &&
    css`
      font-family: "Protest Strike", sans-serif;
      font-size: 48px;
      line-height: 64px;
      font-weight: 800;
      font-weight: 700;
      letter-spacing: 2px;
      text-shadow: 0px 2px 4px rgba(255, 0, 255, 0.8), 0px 0px 1px rgba(255, 0, 255, 1);
    `};

  ${({ variant }) =>
    variant === "h2" &&
    css`
      font-family: "Protest Strike", sans-serif;
      font-size: 36px;
      line-height: 48px;
      font-weight: 700;
      letter-spacing: 1px;
      text-shadow: 0px 2px 4px rgba(255, 0, 255, 0.8), 0px 0px 1px rgba(255, 0, 255, 1);
    `};

  ${({ variant }) =>
    variant === "h3" &&
    css`
      font-family: "Protest Strike", sans-serif;
      font-size: 24px;
      line-height: 32px;
      font-weight: 700;
      letter-spacing: 1px;
      text-shadow: 0px 1px 2px rgba(255, 0, 255, 0.8), 0px 0px 1px rgba(255, 0, 255, 1);
    `};

  ${({ variant }) =>
    variant === "h4" &&
    css`
      font-family: "Protest Strike", sans-serif;
      font-size: 18px;
      line-height: 24px;
      /* font-size: 16px; */
      /* line-height: 24px; */
      font-weight: 700;
      letter-spacing: 1px;
      text-shadow: 0px 0px 2px rgba(255, 0, 255, 1);
    `};

  ${({ variant }) =>
    variant === "label" &&
    css`
      display: block;
      font-size: 14px;
      line-height: 20px;
    `};

  ${({ variant }) =>
    variant === "body" &&
    css`
      font-size: 16px;
      line-height: 20px;
    `};

  ${({ variant }) =>
    variant === "paragraph" &&
    css`
      font-size: 18px;
      line-height: 30px;
    `};

  ${({ variant }) =>
    variant === "timer" &&
    css`
      display: block;
      font-size: 18px;
      line-height: 20px;
    `};

  ${({ variant }) =>
    variant === "mono" &&
    css`
      display: block;
      font-family: "Roboto Mono";
      font-size: 20px;
      line-height: 24px;
      font-weight: 500;
    `};

  ${({ variant }) =>
    variant === "tableHeader" &&
    css`
      font-size: 12px;
      line-height: 20px;
      font-weight: 500;
      text-transform: uppercase;
    `};
`;

function Typography({
  className,
  variant = "body",
  color,
  children,
  as,
  margin,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  marginX,
  marginY,
  ...props
}) {
  const component = as || variantsMapping[variant] || "p";

  return (
    <StyledComponent
      className={className}
      as={component}
      variant={variant}
      color={color}
      margin={calculateSpacingValue(margin, marginTop, marginRight, marginBottom, marginLeft, marginX, marginY)}
      {...props}
    >
      {children}
    </StyledComponent>
  );
}

Typography.propTypes = {
  className: T.string,
  variant: T.oneOf(["h1", "h2", "h3", "h4", "label", "body", "paragraph", "timer", "mono", "tableHeader"]),
  color: T.string,
  children: T.oneOfType([T.object, T.string, T.node]),
  as: T.string,
  margin: T.oneOfType([T.string, T.number]),
  marginTop: T.oneOfType([T.string, T.number]),
  marginRight: T.oneOfType([T.string, T.number]),
  marginBottom: T.oneOfType([T.string, T.number]),
  marginLeft: T.oneOfType([T.string, T.number]),
  marginX: T.oneOfType([T.string, T.number]),
  marginY: T.oneOfType([T.string, T.number]),
};

export default Typography;

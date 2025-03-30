import React, { forwardRef } from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import { calculateSpacingValue } from "commons/util/helpers";

const Box = styled.div`
  display: flex;
  border-radius: var(--border-radius-2);

  align-items: ${({ $alignItems }) => $alignItems && $alignItems};
  justify-content: ${({ $justifyContent }) => $justifyContent && $justifyContent};
  flex-direction: ${({ $flexDirection }) => $flexDirection && $flexDirection};
  flex-wrap: ${({ $flexWrap }) => $flexWrap && $flexWrap};
  gap: ${({ gap }) => gap}px;
  flex-grow: ${({ $flexGrow }) => $flexGrow && $flexGrow};
  flex-shrink: ${({ $flexShrink }) => $flexShrink && $flexShrink};
  flex-basis: ${({ $flexBasis }) => $flexBasis && $flexBasis};

  margin: ${({ margin }) => margin && margin};
  padding: ${({ padding }) => padding && padding};

  ${({ $isBordered }) =>
    $isBordered &&
    css`
      border: 1px solid var(--neutral-180);
    `};
`;

// eslint-disable-next-line react/display-name
const Flexbox = forwardRef(
  (
    {
      className,
      //
      alignItems,
      justifyContent,
      flexDirection,
      flexWrap,
      gap = 0,
      //
      flexGrow,
      flexShrink,
      flexBasis,
      //
      margin,
      marginTop,
      marginRight,
      marginBottom,
      marginLeft,
      marginX,
      marginY,
      //
      padding,
      paddingTop,
      paddingRight,
      paddingBottom,
      paddingLeft,
      paddingX,
      paddingY,
      //
      isBordered,
      //
      children,
      as,
      onClick,
      ...rest
    },
    ref
  ) => {
    return (
      <Box
        ref={ref}
        as={as}
        className={className}
        $alignItems={alignItems}
        $justifyContent={justifyContent}
        $flexDirection={flexDirection}
        $flexWrap={flexWrap}
        gap={gap}
        $flexGrow={flexGrow}
        $flexShrink={flexShrink}
        $flexBasis={flexBasis}
        margin={calculateSpacingValue(margin, marginTop, marginRight, marginBottom, marginLeft, marginX, marginY)}
        padding={calculateSpacingValue(
          padding,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft,
          paddingX,
          paddingY
        )}
        $isBordered={isBordered}
        onClick={onClick}
        onKeyDown={e => {
          if (e.key === "Enter" && onClick) onClick(e);
        }}
        {...rest}
      >
        {children}
      </Box>
    );
  }
);

export const Row = ({ ...props }) => {
  return <Flexbox flexDirection="row" {...props} />;
};

export const Column = ({ ...props }) => {
  return <Flexbox flexDirection="column" {...props} />;
};

Flexbox.propTypes = {
  className: T.string,
  alignItems: T.string,
  justifyContent: T.string,
  flexDirection: T.string,
  flexWrap: T.string,
  gap: T.number,
  flexGrow: T.number,
  flexShrink: T.number,
  flexBasis: T.string,
  margin: T.oneOfType([T.string, T.number]),
  marginTop: T.oneOfType([T.string, T.number]),
  marginRight: T.oneOfType([T.string, T.number]),
  marginBottom: T.oneOfType([T.string, T.number]),
  marginLeft: T.oneOfType([T.string, T.number]),
  marginX: T.oneOfType([T.string, T.number]),
  marginY: T.oneOfType([T.string, T.number]),
  padding: T.oneOfType([T.string, T.number]),
  paddingTop: T.oneOfType([T.string, T.number]),
  paddingRight: T.oneOfType([T.string, T.number]),
  paddingBottom: T.oneOfType([T.string, T.number]),
  paddingLeft: T.oneOfType([T.string, T.number]),
  paddingX: T.oneOfType([T.string, T.number]),
  paddingY: T.oneOfType([T.string, T.number]),
  isBordered: T.bool,
  children: T.oneOfType([T.object, T.string, T.node]),
  as: T.oneOfType([T.string, T.object]),
  onClick: T.func,
  rest: T.object,
};

export default Flexbox;

import React, { forwardRef, useRef } from "react";
import styled, { css } from "styled-components/macro";
import T from "prop-types";
import Icon from "commons/components/Icon";
import Typography from "commons/components/Typography";

const Wrap = styled.div`
  width: 100%;
`;

const Label = styled(Typography)`
  display: inline-block;
  margin-bottom: 4px;
`;

const iconStyle = css`
  color: var(--neutral-160);
  font-size: 20px;
  cursor: text;

  ${({ isClickable }) =>
    isClickable &&
    css`
      cursor: pointer;

      &:hover,
      &:focus {
        color: var(--neutral-140);
        background-color: var(--neutral-190);
      }
    `}
`;

const LeftIcon = styled(Icon)`
  ${iconStyle};
  padding: 9px;
`;

const RightIcon = styled(Icon)`
  ${iconStyle};
  padding: 9px;
`;

const ErrorIcon = styled(Icon)`
  margin-right: 12px;
  color: var(--neutral-200);
  background-color: var(--red-100);
  border-radius: 50%;
`;

const Box = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  background-color: var(--neutral-200);
  border: 1px solid var(--neutral-180);
  border-radius: var(--border-radius-1);
  width: 100%;

  &:hover {
    border: 1px solid var(--neutral-170);
  }

  &:after {
    content: "";
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border-radius: var(--border-radius-1);
    pointer-events: none;
  }

  &:focus-within:after {
    box-shadow: 0px 0px 0px 3px rgba(255, 214, 219, 0.5);
    border: 1px solid var(--primary-140);
  }

  ${({ hasError }) =>
    hasError &&
    css`
      border: 1px solid var(--red-100) !important;

      &:focus-within:after {
        border: 1px solid var(--red-100);
        box-shadow: 0px 0px 0px 3px var(--red-190);
      }
    `}

  ${({ isSuccess }) =>
    isSuccess &&
    css`
      border: 1px solid var(--green-100) !important;

      &:focus-within:after {
        border: 1px solid var(--green-100);
        box-shadow: 0px 0px 0px 3px var(--green-190);
      }
    `}

  ${({ isShell }) =>
    isShell &&
    css`
      cursor: pointer;
    `}
`;

const fieldStyle = css`
  outline: none;
  width: 100%;
  min-height: 38px; //
  border: none;
  background-color: transparent;
  padding: 9px 12px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: var(--neutral-100);

  ::placeholder {
    color: var(--neutral-160);
  }

  ${({ hasLeftIcon }) =>
    hasLeftIcon &&
    css`
      padding-left: 0;
    `}

  ${({ hasRightIcon }) =>
    hasRightIcon &&
    css`
      padding-right: 0;
    `}
`;

const Field = styled.input`
  ${fieldStyle};
`;

const TextareaField = styled.textarea`
  ${fieldStyle};
  resize: vertical;
`;

const Shell = styled.div`
  ${fieldStyle};
  height: 38px;
  cursor: pointer;

  ${({ hasValue }) =>
    !hasValue &&
    css`
      color: var(--neutral-160);
    `}
`;

const helperTextStyles = css`
  font-size: 13px;
  line-height: 20px;
  margin-top: 4px;
`;

const Hint = styled.div`
  ${helperTextStyles};
  color: var(--neutral-160);
  text-align: ${({ alignment }) => alignment};
`;

const Error = styled.div`
  font-size: 13px;
  line-height: 24px;
  height: 0;
  color: var(--red-100);
  text-align: right;

  ${({ hasHint }) =>
    hasHint &&
    css`
      height: auto; // prevent UI jumping
    `}
`;

const KEY_NAME_ENTER = "Enter";

// eslint-disable-next-line react/display-name
const InputBase = forwardRef(
  (
    {
      className,
      value,
      type,
      placeholder,
      label,
      leftIcon,
      rightIcon,
      leftHint,
      rightHint,
      onLeftIconClick,
      onRightIconClick,
      onChange,
      onConfirm,
      onFocus,
      onBlur,
      onKeyDown,
      errorMessage,
      isSuccess,
      autoFocus,
      disabled,
      isTextarea,
      isShell,
      min,
      max,
      step,
      pattern,
      rows,
      ...rest
    },
    ref
  ) => {
    const fieldRef = useRef();
    const hasError = !!errorMessage;
    const hasHint = !!leftHint || !!rightHint;
    const hasLeftIcon = !!leftIcon;
    const hasRightIcon = !!rightIcon;

    function onLabelClick() {
      if (fieldRef.current) fieldRef.current.focus();
    }

    function onLeftIconClickProxy() {
      if (onLeftIconClick) onLeftIconClick();
      if (fieldRef.current) fieldRef.current.focus();
    }

    function onRightIconClickProxy() {
      if (onRightIconClick) onRightIconClick();
      if (fieldRef.current) fieldRef.current.focus();
    }

    function onChangeProxy(e) {
      if (onChange) onChange(e.target.value);
    }

    function onKeyPress(e) {
      if (e.key === KEY_NAME_ENTER && onConfirm) onConfirm(e);
    }

    const commonProps = {
      type,
      onChange: onChangeProxy,
      onKeyPress,
      value,
      placeholder,
      autoFocus,
      onFocus,
      onBlur,
      onKeyDown,
      ref: node => {
        fieldRef.current = node;
        if (ref) ref.current = node;
      },
      disabled,
      min,
      max,
      step,
      pattern,
      hasLeftIcon,
      hasRightIcon,
      ...rest,
    };

    return (
      <Wrap className={className}>
        {label && (
          <Label className="InputBase-label" variant="label" color="neutral-120" onClick={onLabelClick}>
            {label}
          </Label>
        )}
        <Box hasError={hasError} isSuccess={isSuccess} isShell={isShell}>
          {leftIcon && <LeftIcon onClick={onLeftIconClickProxy} isClickable={!!onLeftIconClick} name={leftIcon} />}

          {!isTextarea && !isShell && <Field {...commonProps} />}
          {isTextarea && <TextareaField {...commonProps} rows={rows} />}
          {isShell && (
            <Shell className="shell" hasValue={!!value} hasLeftIcon={hasLeftIcon} hasRightIcon={hasRightIcon}>
              {value ? value : placeholder}
            </Shell>
          )}

          {hasError && <ErrorIcon name="priority_high" />}
          {rightIcon && <RightIcon onClick={onRightIconClickProxy} isClickable={!!onRightIconClick} name={rightIcon} />}
        </Box>
        {leftHint && !errorMessage && <Hint alignment="left">{leftHint}</Hint>}
        {rightHint && !errorMessage && <Hint alignment="right">{rightHint}</Hint>}
        {errorMessage && <Error hasHint={hasHint}>{errorMessage}</Error>}
      </Wrap>
    );
  }
);

InputBase.propTypes = {
  className: T.string,
  value: T.oneOfType([T.string, T.number, T.node]),
  type: T.string,
  placeholder: T.string,
  label: T.oneOfType([T.string, T.object]),
  leftIcon: T.string,
  rightIcon: T.string,
  leftHint: T.string,
  rightHint: T.string,
  onLeftIconClick: T.func,
  onRightIconClick: T.func,
  onChange: T.func,
  onConfirm: T.func,
  onFocus: T.func,
  onBlur: T.func,
  onKeyDown: T.func,
  errorMessage: T.string,
  isSuccess: T.bool,
  autoFocus: T.bool,
  disabled: T.bool,
  isTextarea: T.bool,
  isShell: T.bool,
  min: T.number,
  max: T.number,
  step: T.number,
  pattern: T.string,
  rows: T.number,
};

export default InputBase;

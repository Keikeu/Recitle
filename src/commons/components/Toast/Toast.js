import React from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import Icon from "commons/components/Icon";
import Flexbox from "commons/components/Flexbox";

const Box = styled(Flexbox)`
  position: relative;
  padding: 16px;
  color: var(--neutral-200);
  font-size: 16px;
  line-height: 20px;
  font-weight: 500;
  align-items: flex-start;
  max-width: 560px;
  background-color: ${({ variant }) => {
    if (variant === "success") return "var(--neutral-40)";
    if (variant === "error") return "var(--error-80)";
    if (variant === "info") return "var(--neutral-40)";
  }};

  ${({ shouldShowCloseIcon }) =>
    shouldShowCloseIcon &&
    css`
      padding-right: 60px;
    `}
`;

const ToastIcon = styled(Icon)`
  border-radius: 50%;
  background-color: ${({ variant }) => {
    if (variant === "success") return "var(--success-100)";
    if (variant === "error") return "var(--error-100)";
    if (variant === "info") return "var(--info-100)";
  }};
`;

const CloseIcon = styled(Icon)`
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 8px;
  border-radius: var(--border-radius-1);

  background-color: ${({ variant }) => {
    if (variant === "success") return "var(--neutral-100)";
    if (variant === "error") return "var(--error-90)";
    if (variant === "info") return "var(--neutral-100)";
  }};

  &:hover {
    background-color: ${({ variant }) => {
      if (variant === "success") return "var(--neutral-120)";
      if (variant === "error") return "var(--error-100)";
      if (variant === "info") return "var(--neutral-120)";
    }};
  }
`;

const iconVariants = {
  success: "check",
  error: "priority_high",
  info: "info_i",
};

function Toast({ id, variant = "success", label, hideToast, autoHide }) {
  const shouldShowCloseIcon = !autoHide || variant === "error";
  return (
    <Box gap={16} variant={variant} shouldShowCloseIcon={shouldShowCloseIcon}>
      {/* <ToastIcon size={20} name={iconVariants[variant]} variant={variant} /> */}
      {label}
      {shouldShowCloseIcon && <CloseIcon name="close" size={20} variant={variant} onClick={() => hideToast(id)} />}
    </Box>
  );
}

Toast.propTypes = {
  id: T.number,
  variant: T.oneOf(["success", "error", "info"]),
  label: T.string,
  hideToast: T.func,
  autoHide: T.bool,
};

export default Toast;

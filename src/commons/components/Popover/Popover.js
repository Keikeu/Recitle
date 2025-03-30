import React, { useEffect, useMemo, useState } from "react";
import T from "prop-types";
import styled, { css } from "styled-components/macro";
import { usePopper } from "react-popper";
import { AnimatePresence, motion } from "framer-motion";

const TriggerWrap = styled.span`
  cursor: pointer;
`;

const ContentWrap = styled.div`
  z-index: var(--z-index-above);
`;

const InnerWrap = styled(motion.div)`
  background-color: var(--neutral-200);
  box-shadow: var(--shadow-3);
  border-radius: var(--border-radius-2);
  max-height: 100vh;
  overflow-y: auto;
  transition: width 0.5s;

  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;

function Popover({
  trigger,
  content,
  placement = "bottom-end",
  isFullWidth = false,
  isTriggerTabbable = false,
  onClose,
  triggerStyles,
  contentStyles,
  offset = 8,
  stopPropagation = false,
  isOpen = false,
}) {
  const [isVisible, setIsVisibile] = useState(isOpen);
  const [triggerElement, setTriggerElement] = useState(null);
  const [contentElement, setContentElement] = useState(null);

  const triggerElementWidth = useMemo(() => {
    return triggerElement?.offsetWidth;
  }, [triggerElement, isVisible]);

  function closePopover(e) {
    if (onClose) onClose();
    setIsVisibile(false);
    e?.stopPropagation();
  }

  useEffect(() => {
    setIsVisibile(isOpen);
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (isVisible && !triggerElement?.contains(e.target) && !contentElement?.contains(e.target)) {
        closePopover();
      }
    }

    if (isVisible && !isOpen) {
      document.addEventListener("mouseup", handleClickOutside);
      return () => {
        document.removeEventListener("mouseup", handleClickOutside);
      };
    }
  }, [isVisible, triggerElement, contentElement]);

  function handleTriggerClick(e) {
    e.preventDefault();
    if (stopPropagation) e.stopPropagation();

    if (isVisible) {
      closePopover();
    } else {
      setIsVisibile(true);
    }
  }

  const { styles, attributes } = usePopper(triggerElement, contentElement, {
    placement: placement,
    strategy: "fixed",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, offset],
        },
      },
      {
        name: "preventOverflow",
        options: {
          altAxis: true,
        },
      },
    ],
  });

  function onKeyDown(e) {
    if (e.key === "Enter") {
      handleTriggerClick(e);
    }
  }

  return (
    <>
      <TriggerWrap
        ref={setTriggerElement}
        onClick={handleTriggerClick}
        style={triggerStyles}
        tabIndex={isTriggerTabbable ? "0" : "-1"}
        onKeyDown={isTriggerTabbable ? onKeyDown : undefined}
      >
        {typeof trigger === "function" ? trigger(handleTriggerClick) : trigger}
      </TriggerWrap>

      <AnimatePresence>
        {isVisible && (
          <ContentWrap ref={setContentElement} style={{ ...styles.popper }} {...attributes.popper}>
            <InnerWrap
              style={{ ...contentStyles }}
              width={isFullWidth ? triggerElementWidth : ""}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{
                duration: 0.1,
              }}
            >
              {typeof content === "function" ? content(closePopover) : content}
            </InnerWrap>
          </ContentWrap>
        )}
      </AnimatePresence>
    </>
  );
}

Popover.propTypes = {
  trigger: T.oneOfType([T.object, T.string, T.node, T.func]),
  content: T.oneOfType([T.object, T.string, T.node, T.func]),
  placement: T.oneOf([
    "auto",
    "auto-start",
    "auto-end",
    "bottom-end",
    "bottom-start",
    "bottom",
    "left-end",
    "left-start",
    "left",
    "right-end",
    "right-start",
    "right",
    "top-end",
    "top-start",
    "top",
  ]),
  isFullWidth: T.bool,
  isTriggerTabbable: T.bool,
  onClose: T.func,
  triggerStyles: T.object,
  contentStyles: T.object,
  offset: T.number,
  stopPropagation: T.bool,
  isOpen: T.bool,
};

export default Popover;

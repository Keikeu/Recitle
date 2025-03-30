import { useCallback, useEffect } from "react";

const KEY_NAME_ENTER = "Enter";
const KEY_EVENT_TYPE = "keyup";

export const useEnterKeyPress = (element, handleKeyPress) => {
  const handleEnterKey = useCallback(
    event => {
      if (event.key === KEY_NAME_ENTER) {
        handleKeyPress();
      }
    },
    [handleKeyPress]
  );

  useEffect(() => {
    if (element) element.addEventListener(KEY_EVENT_TYPE, handleEnterKey, false);

    return () => {
      if (element) element.removeEventListener(KEY_EVENT_TYPE, handleEnterKey, false);
    };
  }, [handleEnterKey, element]);
};

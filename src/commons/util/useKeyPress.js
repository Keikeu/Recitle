import { useCallback, useEffect } from "react";

const KEY_EVENT_TYPE = "keydown";

export const useKeyPress = (keyName, action, metaKey = false) => {
  const handleKeyPress = useCallback(
    event => {
      if (event.key === keyName && event.metaKey === metaKey) {
        event.preventDefault();
        action(event);
      }
    },
    [action, keyName]
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleKeyPress, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleKeyPress, false);
    };
  }, [action, handleKeyPress]);
};

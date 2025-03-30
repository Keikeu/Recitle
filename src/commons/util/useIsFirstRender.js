import { useRef } from "react";

// Simple React hook that returns a boolean;
// true at the mount time
// Then always false
export function useIsFirstRender() {
  const isFirst = useRef(true);

  if (isFirst.current) {
    isFirst.current = false;

    return true;
  }

  return isFirst.current;
}

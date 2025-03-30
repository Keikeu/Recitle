import { useEffect } from "react";
import { useIsFirstRender } from "./useIsFirstRender";

// Just modified version of useEffect that is skipping the first render
export function useUpdateEffect(effect, dependencyList) {
  const isFirst = useIsFirstRender();

  useEffect(() => {
    if (!isFirst) {
      return effect();
    }
  }, dependencyList);
}

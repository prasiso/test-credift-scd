import { DependencyList, useEffect, useRef } from 'react';

export function useUpdateState(back: (init: boolean) => void, dep:DependencyList, firstRender = false) {
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      if (firstRender) {
        back(isFirstRender.current);
        isFirstRender.current = false;
      }
      isFirstRender.current = false;
      return;
    }
    back(isFirstRender.current);

  }, dep);
}


import { useEffect, useState } from 'react';

const useMediaQuery = (width: number) => {
  const [targetReached, setTargetReached] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    if (media.matches !== targetReached) {
      setTargetReached(media.matches);
    }

    const listener = () => {
      setTargetReached(media.matches);
    };
    media.addEventListener('change', listener);
    return () => {
      media.removeEventListener('change', listener);
    };
  }, []);

  return targetReached;
};

export default useMediaQuery;

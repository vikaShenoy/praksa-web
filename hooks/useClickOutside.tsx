import React, { useEffect } from 'react';

interface Props {
  ref: React.MutableRefObject<HTMLElement | null>;
  onClick: () => void;
}

const useClickOutside = ({ ref, onClick }: Props) => {
  const onOutsideClick = (e: MouseEvent) => {
    const el = e.target as HTMLInputElement;
    if (ref.current && !ref.current.contains(el)) {
      onClick();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onOutsideClick);
    return () => {
      document.removeEventListener('mousedown', onOutsideClick);
    };
  }, [ref, onClick]);
};

export default useClickOutside;

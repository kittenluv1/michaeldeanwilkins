'use client'

import { useEffect, useState } from 'react';
import { useImageLoad } from './ImageLoadProvider';

export default function Splash() {
  const { allLoaded } = useImageLoad();
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (allLoaded) {
      setFadeOut(true);
      const t = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(t);
    }
  }, [allLoaded]);

  if (!visible) return null;

  return (
    <div className={`fixed h-full w-full bg-white z-100 flex justify-center items-center transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <img
        className="h-10 max-w-2/3"
        src="/logo.svg"
        alt="Michael Dean Wilkins logo splash screen"
      />
    </div>
  );
}

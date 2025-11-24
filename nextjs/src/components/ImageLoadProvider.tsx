'use client'

import React, { createContext, useContext, useEffect, useState } from 'react';

type ImageLoadContextType = {
  register: () => void;
  markLoaded: () => void;
  total: number;
  loaded: number;
  allLoaded: boolean;
}

const ImageLoadContext = createContext<ImageLoadContextType>({
  register: () => {},
  markLoaded: () => {},
  total: 0,
  loaded: 0,
  allLoaded: false,
});

export function ImageLoadProvider({ children }: { children: React.ReactNode }) {
  const [total, setTotal] = useState(0);
  const [loaded, setLoaded] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);

  useEffect(() => {
    if (total === 0) {
      // No images have registered — treat as already loaded so splash can hide.
      setAllLoaded(true);
      return;
    }

    if (loaded >= total) {
      setAllLoaded(true);
    } else {
      setAllLoaded(false);
    }
  }, [total, loaded]);

  const register = () => setTotal((t) => {
    // When an image registers, ensure we mark not-all-loaded so splash stays visible
    setAllLoaded(false);
    return t + 1;
  });
  const markLoaded = () => setLoaded((l) => l + 1);

  return (
    <ImageLoadContext.Provider value={{ register, markLoaded, total, loaded, allLoaded }}>
      {children}
    </ImageLoadContext.Provider>
  );
}

export const useImageLoad = () => useContext(ImageLoadContext);

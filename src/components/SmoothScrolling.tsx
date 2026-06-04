"use client";

import { ReactLenis } from 'lenis/react'
import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

function ScrollRestoration() {
  const pathname = usePathname();
  
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function SmoothScrolling({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}>
      <ScrollRestoration />
      {children}
    </ReactLenis>
  )
}

import { useState, useEffect, RefObject } from "react";

export function useMobileViewport(mainContainerRef: RefObject<HTMLElement>) {
  const [isMobile, setIsMobile] = useState(false);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const checkMobileAndViewport = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      const vh = window.innerHeight;
      setViewportHeight(vh);
      if (isMobileDevice && mainContainerRef.current) {
        mainContainerRef.current.style.height = `${vh}px`;
      }
    };
    checkMobileAndViewport();
    if (mainContainerRef.current) {
      mainContainerRef.current.style.height = isMobile
        ? `${viewportHeight}px`
        : "100svh";
    }
    window.addEventListener("resize", checkMobileAndViewport);
    return () => {
      window.removeEventListener("resize", checkMobileAndViewport);
    };
  }, [isMobile, viewportHeight, mainContainerRef]);

  return { isMobile, viewportHeight };
}

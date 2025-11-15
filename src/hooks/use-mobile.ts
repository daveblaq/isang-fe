import { useEffect, useState } from "react";

const MOBILE_QUERY = "(max-width: 768px)";

function getMatches(query: string) {
  if (typeof window === "undefined") return false;
  return window.matchMedia(query).matches;
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(() =>
    getMatches(MOBILE_QUERY)
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia(MOBILE_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}

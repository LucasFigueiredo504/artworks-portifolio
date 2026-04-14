import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function usePageTracking() {
  const location = useLocation();

  useEffect(() => {
    window.gtag?.("config", "G-ZY5J3YX773", {
      page_path: location.pathname,
    });
  }, [location]);
}

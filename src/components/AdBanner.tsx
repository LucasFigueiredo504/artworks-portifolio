import { useEffect } from "react";

interface AdBannerProps {
  slot: string;
}

export default function AdBanner({ slot }: AdBannerProps) {
  useEffect(() => {
    try {
      // @ts-expect-error adsbygoogle vem do script externo
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error("Adsense error:", err);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", width: "100%", margin: "40px 0" }}
      data-ad-client="ca-pub-5048154111210294"
      data-ad-slot={slot}
      data-ad-format="auto"
      data-full-width-responsive="true"
    />
  );
}

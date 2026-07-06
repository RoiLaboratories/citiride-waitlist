"use client";

import { useState } from "react";

type AssetImageProps = {
  alt: string;
  className?: string;
  fallbackLabel?: string;
  src: string;
};

export function AssetImage({
  alt,
  className,
  fallbackLabel,
  src,
}: AssetImageProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`asset-image ${className ?? ""}`}>
      {failed ? (
        <div className="asset-image__fallback">
          <span>{fallbackLabel ?? alt}</span>
        </div>
      ) : (
        <img src={src} alt={alt} onError={() => setFailed(true)} />
      )}
    </div>
  );
}

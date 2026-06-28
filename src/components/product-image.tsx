"use client";

import { useState } from "react";
import { BottleArt } from "./bottle-art";

export function ProductImage({
  code,
  imageUrl,
  name,
  className = "",
  imgClassName = "",
  artClassName = "",
  showCode = false,
}: {
  code: string;
  imageUrl?: string;
  name?: string;
  className?: string;
  imgClassName?: string;
  artClassName?: string;
  showCode?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const useImg = imageUrl && imageUrl.length > 0 && !failed;

  return (
    <div className={`grid place-items-center ${className}`}>
      {useImg ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={name ? `${name} perfume` : `Perfume ${code}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={`object-contain ${imgClassName}`}
        />
      ) : (
        <BottleArt
          code={code}
          showCode={showCode}
          className={artClassName || imgClassName}
        />
      )}
    </div>
  );
}

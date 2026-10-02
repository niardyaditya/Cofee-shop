import React, { useState, useEffect } from 'react';
import { processImageTransparency } from '../utils/transparency';

interface TransparentImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  enableAutoCrop?: boolean;
  blendFallback?: boolean;
}

export const TransparentImage: React.FC<TransparentImageProps> = ({
  src,
  alt,
  className = '',
  blendFallback = true,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    let isCancelled = false;

    // Run the automatic canvas transparency processor
    processImageTransparency(src)
      .then((processedUrl) => {
        if (!isCancelled) {
          setCurrentSrc(processedUrl);
        }
      })
      .catch(() => {
        if (!isCancelled) {
          setCurrentSrc(src);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [src]);

  return (
    <div className="relative inline-flex items-center justify-center overflow-visible">
      {/* Visual background blend wrapper ensuring transparent integration */}
      <img
        {...props}
        src={currentSrc}
        alt={alt}
        loading="lazy"
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        className={`${className} transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        } ${blendFallback ? 'mix-blend-multiply contrast-[1.03]' : ''}`}
        style={{
          filter: 'drop-shadow(0 18px 24px rgba(30, 57, 50, 0.16))',
          ...props.style,
        }}
      />

      {/* Styled fallback container in case of error */}
      {hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-emerald-50/50 p-4 text-center text-xs text-[#006c47]">
          <span className="material-symbols-outlined text-3xl">local_cafe</span>
          <span className="mt-1 font-semibold">{alt}</span>
        </div>
      )}
    </div>
  );
};

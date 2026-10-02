/**
 * Utility to automatically remove solid/light/white backgrounds from product images
 * using an HTML5 offscreen Canvas with soft anti-aliased alpha feathering.
 */

const transparentCache = new Map<string, string>();

export async function processImageTransparency(
  imageUrl: string,
  options: {
    threshold?: number;
    feather?: number;
  } = {}
): Promise<string> {
  const { threshold = 238, feather = 20 } = options;

  if (transparentCache.has(imageUrl)) {
    return transparentCache.get(imageUrl)!;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageUrl;

    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth || img.width;
        canvas.height = img.naturalHeight || img.height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });

        if (!ctx) {
          resolve(imageUrl);
          return;
        }

        ctx.drawImage(img, 0, 0);
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Sample corner pixels to detect the background shade
        const samplePoints = [
          0, // top-left
          (canvas.width - 1) * 4, // top-right
          (canvas.height - 1) * canvas.width * 4, // bottom-left
          ((canvas.height - 1) * canvas.width + (canvas.width - 1)) * 4, // bottom-right
        ];

        let bgR = 255;
        let bgG = 255;
        let bgB = 255;
        let count = 0;

        for (const idx of samplePoints) {
          if (idx < data.length) {
            bgR += data[idx];
            bgG += data[idx + 1];
            bgB += data[idx + 2];
            count++;
          }
        }
        if (count > 0) {
          bgR = Math.round(bgR / (count + 1));
          bgG = Math.round(bgG / (count + 1));
          bgB = Math.round(bgB / (count + 1));
        }

        const len = data.length;
        for (let i = 0; i < len; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Check if pixel is pure white or close to sampled background
          const isNearWhite = r >= threshold && g >= threshold && b >= threshold;
          const diffR = Math.abs(r - bgR);
          const diffG = Math.abs(g - bgG);
          const diffB = Math.abs(b - bgB);
          const maxDiff = Math.max(diffR, diffG, diffB);

          // Check for grey/white checkerboard pattern tiles often found in mock transparent PNGs
          const isCheckerboardTile =
            (r >= 195 && r <= 255 && g >= 195 && g <= 255 && b >= 195 && b <= 255 && Math.abs(r - g) < 5 && Math.abs(g - b) < 5);

          if (isNearWhite || maxDiff < 18 || (isCheckerboardTile && (r > 215 || isNearWhite))) {
            // Soft anti-aliasing feathering near boundaries
            if (maxDiff >= 12 && maxDiff < 25) {
              const alphaFactor = (maxDiff - 12) / 13;
              data[i + 3] = Math.min(data[i + 3], Math.round(alphaFactor * 255));
            } else {
              data[i + 3] = 0; // Fully transparent
            }
          }
        }

        ctx.putImageData(imgData, 0, 0);
        const dataUrl = canvas.toDataURL('image/png');
        transparentCache.set(imageUrl, dataUrl);
        resolve(dataUrl);
      } catch (err) {
        // Fallback gracefully (e.g. if crossOrigin tainted)
        resolve(imageUrl);
      }
    };

    img.onerror = () => {
      resolve(imageUrl);
    };
  });
}

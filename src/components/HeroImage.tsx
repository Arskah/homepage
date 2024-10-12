import type { ImgHTMLAttributes } from "react";

import { heroContainer, heroImage } from "./HeroImage.css";

interface HeroImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  src: string;
}

export const HeroImage = ({ alt, src, ...props }: HeroImageProps) => (
  <div className={heroContainer}>
    <img alt={alt} className={heroImage} src={src} {...props} />
  </div>
);

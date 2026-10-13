import type { ImgHTMLAttributes } from "react";

import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  heroContainer: {
    width: "100%",
  },
  heroImage: {
    borderRadius: 4,
    display: "block",
    marginBlock: "1rem",
    marginInline: "auto",
  },
});

interface HeroImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  src: string;
}

export const HeroImage = ({ alt, src, ...props }: HeroImageProps) => (
  <div {...stylex.props(styles.heroContainer)}>
    <img alt={alt} src={src} {...stylex.props(styles.heroImage)} {...props} />
  </div>
);

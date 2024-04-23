import { styles } from "./Footer.css";
import { SocialLinks } from "./SocialLinks";

export const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <footer className={styles}>
      &copy; {year} Aarni Halinen. All rights reserved.
      <SocialLinks />
    </footer>
  );
};

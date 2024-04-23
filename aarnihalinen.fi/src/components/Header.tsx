import { anchorStyles, h2Styles, headerStyles, navStyles } from "./Header.css";
import { HeaderLink } from "./HeaderLink";
import { SocialLinks } from "./SocialLinks";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => (
  <header className={headerStyles}>
    <nav className={navStyles}>
      <h2 className={h2Styles}>
        <a className={anchorStyles} href="/">
          {title}
        </a>
      </h2>
      <div className="internal-links">
        <HeaderLink className={anchorStyles} href="/">
          Home
        </HeaderLink>
        <HeaderLink className={anchorStyles} href="/blog">
          Blog
        </HeaderLink>
        <HeaderLink className={anchorStyles} href="/about">
          About
        </HeaderLink>
      </div>
      <SocialLinks />
    </nav>
  </header>
);

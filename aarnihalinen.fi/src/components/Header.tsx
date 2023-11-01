import { styled } from "styled-components";

import { HeaderLink } from "./HeaderLink";
import { SocialLinks } from "./SocialLinks";

const HeaderComponent = styled.header`
  margin: 0;
  padding: 0 1em;
  background: white;
  box-shadow: 0 2px 8px rgba(var(--black), 5%);

  h2 {
    margin: 0;
    font-size: 1em;
  }

  h2 a,
  h2 a.active {
    text-decoration: none;
  }
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  nav a {
    padding: 1em 0.5em;
    color: var(--black);
    border-bottom: 4px solid transparent;
    text-decoration: none;
  }
  nav a.active {
    text-decoration: none;
    border-bottom-color: var(--accent);
  }
`;

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => (
  <HeaderComponent>
    <nav>
      <h2>
        <a href="/">{title}</a>
      </h2>
      <div className="internal-links">
        <HeaderLink href="/">Home</HeaderLink>
        <HeaderLink href="/blog">Blog</HeaderLink>
        <HeaderLink href="/about">About</HeaderLink>
      </div>
      <SocialLinks />
    </nav>
  </HeaderComponent>
);
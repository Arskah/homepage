import { styled } from "styled-components";
import { SocialLinks } from "./SocialLinks";

const FooterComponent = styled.footer`
  padding: 2em 1em 6em 1em;
  background: linear-gradient(var(--gray-gradient)) no-repeat;
  color: rgb(var(--gray));
  text-align: center;
`;

export const Footer = () => {
  const today = new Date();
  const year = today.getFullYear();
  return (
    <FooterComponent>
      &copy; {year} Aarni Halinen. All rights reserved.
      <SocialLinks />
    </FooterComponent>
  );
};

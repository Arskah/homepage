import { type PropsWithChildren } from "react";
import { styled } from "styled-components";

const Main = styled.main`
  width: 960px;

  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
  ul li {
    width: calc(50% - 1rem);
  }
  ul li * {
    text-decoration: none;
    transition: 0.2s ease;
  }
  ul li:first-child {
    width: 100%;
    margin-bottom: 1rem;
    text-align: center;
  }
  ul li:first-child img {
    width: 100%;
  }
  ul li:first-child .title {
    font-size: 2.369rem;
  }
  ul li img {
    margin-bottom: 0.5rem;
    border-radius: 12px;
  }
  ul li a {
    display: block;
  }
  .title {
    margin: 0;
    color: rgb(var(--black));
    line-height: 1;
  }
  .date {
    margin: 0;
    color: rgb(var(--gray));
  }
  ul li a:hover h4,
  ul li a:hover .date {
    color: rgb(var(--accent));
  }
  ul a:hover img {
    box-shadow: var(--box-shadow);
  }
  @media (max-width: 720px) {
    ul {
      gap: 0.5em;
    }
    ul li {
      width: 100%;
      text-align: center;
    }
    ul li:first-child {
      margin-bottom: 0;
    }
    ul li:first-child .title {
      font-size: 1.563em;
    }
  }
`;

export const BlogMain = ({ children }: PropsWithChildren) => (
  <Main>{children}</Main>
);

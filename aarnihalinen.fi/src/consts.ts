// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.
import { createGlobalStyle } from "styled-components";

export const SITE_TITLE = "Astro Blog";
export const SITE_DESCRIPTION = "Welcome to my website!";
export const Global = createGlobalStyle`
/*
  The CSS in this style tag is based off of Bear Blog's default CSS.
  https://github.com/HermanMartinus/bearblog/blob/297026a877bc2ab2b3bdfbd6b9f7961c350917dd/templates/styles/blog/default.css
  License MIT: https://github.com/HermanMartinus/bearblog/blob/master/LICENSE.md
 */

:root {
  --accent: #2337ff;
  --accent-dark: #000d8a;
  --black: 15, 18, 25;
  --gray: 96, 115, 159;
  --gray-light: 229, 233, 240;
  --gray-dark: 34, 41, 57;
  --gray-gradient: rgba(var(--gray-light), 50%), #fff;
  --box-shadow: 0 2px 6px rgba(var(--gray), 25%), 0 8px 24px rgba(var(--gray), 33%),
    0 16px 32px rgba(var(--gray), 33%);
}
@font-face {
  font-family: 'Atkinson';
  src: url('/fonts/atkinson-regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
@font-face {
  font-family: 'Atkinson';
  src: url('/fonts/atkinson-bold.woff') format('woff');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}
body {
  font-family: 'Atkinson', sans-serif;
  margin: 0;
  padding: 0;
  text-align: left;
  background: linear-gradient(var(--gray-gradient)) no-repeat;
  background-size: 100% 600px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  color: rgb(var(--gray-dark));
  font-size: 20px;
  line-height: 1.7;
}
main {
  width: 720px;
  max-width: calc(100% - 2em);
  margin: auto;
  padding: 3em 1em;
}
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0 0 0.5rem 0;
  color: rgb(var(--black));
  line-height: 1.2;
}
h1 {
  font-size: 3.052em;
}
h2 {
  font-size: 2.441em;
}
h3 {
  font-size: 1.953em;
}
h4 {
  font-size: 1.563em;
}
h5 {
  font-size: 1.25em;
}
strong,
b {
  font-weight: 700;
}
a {
  color: var(--accent);
}
a:hover {
  color: var(--accent);
}
p {
  margin-bottom: 1em;
}
.prose p {
  margin-bottom: 2em;
}
textarea {
  width: 100%;
  font-size: 16px;
}
input {
  font-size: 16px;
}
table {
  width: 100%;
}
img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}
code {
  padding: 2px 5px;
  background-color: rgb(var(--gray-light));
  border-radius: 2px;
}
pre {
  padding: 1.5em;
  border-radius: 8px;
}
pre > code {
  all: unset;
}
blockquote {
  border-left: 4px solid var(--accent);
  padding: 0 0 0 20px;
  margin: 0px;
  font-size: 1.333em;
}
hr {
  border: none;
  border-top: 1px solid rgb(var(--gray-light));
}
@media (max-width: 720px) {
  body {
    font-size: 18px;
  }
  main {
    padding: 1em;
  }
}

.sr-only {
  border: 0;
  padding: 0;
  margin: 0;
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  /* IE6, IE7 - a 0 height clip, off to the bottom right of the visible 1px box */
  clip: rect(1px 1px 1px 1px);
  /* maybe deprecated but we need to support legacy browsers */
  clip: rect(1px, 1px, 1px, 1px);
  /* modern browsers, clip-path works inwards from each corner */
  clip-path: inset(50%);
  /* added line to stop words getting smushed together (as they go onto seperate lines and some screen readers do not understand line feeds as a space */
  white-space: nowrap;
}
`;

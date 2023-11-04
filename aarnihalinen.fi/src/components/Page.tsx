import type { PropsWithChildren } from "react";
import { Global } from "../consts";

export const Page = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Global />
      <body>{children}</body>
    </>
  );
};

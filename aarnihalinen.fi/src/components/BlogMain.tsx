import { type PropsWithChildren } from "react";
import { styles } from "./BlogMain.css";

export const BlogMain = ({ children }: PropsWithChildren) => (
  <main className={styles}>{children}</main>
);

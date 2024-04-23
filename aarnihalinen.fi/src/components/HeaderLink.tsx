import { styles } from "./HeaderLink.css";

export const HeaderLink = ({
  className,
  ...restProps
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  // const { pathname } = window.location;
  // const isActive = restProps.href === pathname || restProps.href === pathname.replace(/\/$/, '');
  const isActive = false;
  const classes = `${styles} ${className ?? ""} ${isActive ? "active" : ""}`;
  return (
    <a className={classes} {...restProps}>
      <slot />
    </a>
  );
};

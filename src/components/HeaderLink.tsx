import styled from 'styled-components';


const Link = styled.a`
  display: inline-block;
  text-decoration: none;
  &.active {
    font-weight: bolder;
    text-decoration: underline;
  }
`

export const HeaderLink = ({ className, ...restProps }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
  // const { pathname } = window.location;
  // const isActive = restProps.href === pathname || restProps.href === pathname.replace(/\/$/, '');
  const isActive = false;
  const classes = `${className ?? ""} ${isActive ? "active" : ""}`
  return (
    <Link className={classes} {...restProps}>
      <slot />
    </Link>
  )
}

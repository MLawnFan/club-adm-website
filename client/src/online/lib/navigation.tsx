import type { AnchorHTMLAttributes, MouseEvent } from "react";
import { Link as WouterLink, useLocation } from "wouter";
import { splitPageUrl } from "./pageParameters";
export { useLocation } from "wouter";

type PrivateLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };
export function Link({ href, onClick, ...rest }: PrivateLinkProps) {
  const [, navigate] = useLocation();
  const url = splitPageUrl(href, window.location.href).cleanUrl;
  const cleanHref = `${url.pathname}${url.search}${url.hash}`;
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (!event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      navigate(href);
    }
  };
  return <WouterLink {...rest} href={cleanHref} onClick={handleClick} />;
}

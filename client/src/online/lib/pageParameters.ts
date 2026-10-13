// Keep funnel parameters in first-party history state, never in URLs read by ad SDKs.
const STATE_KEY = "admPrivatePageParameters";
const INSTALLED_KEY = "__admPrivateNavigationInstalled";

type PrivateParameters = { path: string; search: string };

export function splitPageUrl(input: string, base: string) {
  const url = new URL(input, base);
  const originalSearch = url.search;
  const publicParameters = new URLSearchParams();
  const fbclid = url.searchParams.get("fbclid");
  if (fbclid && /^[A-Za-z0-9_-]{10,500}$/.test(fbclid)) publicParameters.set("fbclid", fbclid);
  if (url.searchParams.get("from_webdev") === "1") publicParameters.set("from_webdev", "1");
  url.search = publicParameters.toString();
  if (!/^#[a-zA-Z0-9_-]*$/.test(url.hash)) url.hash = "";
  return { cleanUrl: url, privateParameters: { path: url.pathname, search: originalSearch } };
}

export function getPageParameters(): URLSearchParams {
  const saved = window.history.state?.[STATE_KEY] as PrivateParameters | undefined;
  const result = new URLSearchParams(saved?.path === window.location.pathname ? saved.search : "");
  new URLSearchParams(window.location.search).forEach((value, key) => result.set(key, value));
  return result;
}

export function installPrivateNavigation() {
  const win = window as Window & { [INSTALLED_KEY]?: boolean };
  if (win[INSTALLED_KEY]) return;
  win[INSTALLED_KEY] = true;
  const originalReplace = window.history.replaceState.bind(window.history);
  for (const method of ["pushState", "replaceState"] as const) {
    const original = window.history[method].bind(window.history);
    window.history[method] = (state, unused, input) => {
      if (input == null) return original(state, unused, input);
      const target = new URL(String(input), window.location.href);
      if (target.origin !== window.location.origin || !(target.pathname === "/online-project" || target.pathname.startsWith("/online-project/"))) return original(state, unused, input);
      const { cleanUrl, privateParameters } = splitPageUrl(String(input), window.location.href);
      const current = window.history.state?.[STATE_KEY] as PrivateParameters | undefined;
      // An unchanged clean URL (e.g. reload or Wouter history update) keeps its first-party state.
      const saved = method === "replaceState" && privateParameters.search === cleanUrl.search && cleanUrl.href === window.location.href && current?.path === cleanUrl.pathname
        ? { ...privateParameters, search: current.search }
        : privateParameters;
      return original({ ...(state ?? {}), [STATE_KEY]: saved }, unused, cleanUrl.href);
    };
  }
  if (!(window.location.pathname === "/online-project" || window.location.pathname.startsWith("/online-project/"))) return;
  const { cleanUrl, privateParameters } = splitPageUrl(window.location.href, window.location.href);
  const previous = window.history.state?.[STATE_KEY] as PrivateParameters | undefined;
  originalReplace({ ...(window.history.state ?? {}), [STATE_KEY]: previous?.path === cleanUrl.pathname && cleanUrl.href === window.location.href ? previous : privateParameters }, "", cleanUrl.href);
}

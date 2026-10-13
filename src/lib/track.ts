type Gtag = (command: "event", name: string, params?: Record<string, string>) => void;

export function track(name: string, params: Record<string, string> = {}) {
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}

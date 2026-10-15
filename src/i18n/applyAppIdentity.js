export function applyAppIdentity(messages) {
  document.documentElement.lang = messages.code;
  document.title = messages.documentTitle;

  const appleTitle = document.querySelector('meta[name="apple-mobile-web-app-title"]');
  if (appleTitle) {
    appleTitle.setAttribute('content', messages.appName);
  }

  const manifest = document.querySelector('link[rel="manifest"]');
  if (manifest) {
    manifest.setAttribute('href', `${import.meta.env.BASE_URL}manifest-${messages.code}.webmanifest`);
  }
}

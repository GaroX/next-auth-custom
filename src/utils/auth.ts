export function getAuthToken() {
  if (typeof document === "undefined") return null;
  const regex = /(^| )authToken=([^;]+)/;
  const match = regex.exec(document.cookie);
  return match ? match[2] : null;
}

export function isAuthenticated() {
  return !!getAuthToken();
}

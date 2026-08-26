const LOCAL_API_BASE_URL = "http://localhost:8000/api";

function trimTrailingSlash(url: string) {
  return url.replace(/\/+$/, "");
}

function shouldUseLocalApi() {
  return (
    process.env.NEXT_PUBLIC_API_TARGET === "local" ||
    (!process.env.NEXT_PUBLIC_API_TARGET &&
      process.env.NODE_ENV === "development")
  );
}

export function getApiBaseUrl() {
  if (shouldUseLocalApi()) {
    return LOCAL_API_BASE_URL;
  }

  return trimTrailingSlash(
    process.env.NEXT_PUBLIC_BASE_API ??
      process.env.API_URL ??
      LOCAL_API_BASE_URL,
  );
}

export function getGoogleLoginUrl() {
  if (shouldUseLocalApi()) {
    return `${LOCAL_API_BASE_URL}/auth/google`;
  }

  return (
    process.env.NEXT_PUBLIC_GOOGLE_CALLBACK ?? `${getApiBaseUrl()}/auth/google`
  );
}

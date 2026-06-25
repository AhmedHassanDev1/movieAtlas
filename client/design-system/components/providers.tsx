"use client"
import { ThemeProvider } from "@mui/material";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { theme } from "../theme/theme";
import { useLocale } from "next-intl";

import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export const queryClient = new QueryClient({
   defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})
export const rtlCache = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

export const ltrCache = createCache({
  key: "muiltr",
  stylisPlugins: [prefixer, rtlPlugin],
});
function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = useLocale()
  const pathname = usePathname();

  const dir = locale === "ar" ? "rtl" : "ltr"
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);
  
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider value={locale === "ar" ? rtlCache : ltrCache}>
        <ThemeProvider theme={{ ...theme, direction: dir }}>
          <html
            dir={dir}
            lang={locale}

            className=''>

            {children}
          </html>
        </ThemeProvider>
      </CacheProvider>
    </QueryClientProvider >
  )
}

export default Providers

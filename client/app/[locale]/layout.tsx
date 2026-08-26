
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import "./styles/globals.css";
import "./styles/animate.css";
import { getLocale, getMessages } from "next-intl/server";
import Providers from "@/design-system/components/providers";
import { NextIntlClientProvider } from 'next-intl';
import { CssBaseline } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import Header from "@/design-system/components/layout/Header"
import { Metadata } from 'next';
import { getTranslations } from "next-intl/server";


export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: [
      "movies",
      "tv shows",
      "watch movies",
      "movie database",
      "ratings",
      "trending movies",
      "series",
      "film discovery",
    ],
    authors: [{ name: "Movie Atlas Team" }],
    creator: "Movie Atlas",
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: process.env.DOMIAN_URL,
      siteName: "Movie Atlas",
      type: "website",
      images: [
        {
          url: "https://your-domain.com/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Movie Atlas preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t('title'),
      description: t('description'),
      images: ["https://your-domain.com/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  
  
  return (
    <NextIntlClientProvider messages={messages}>
      <Providers>
        <body className="min-h-full flex flex-col">
          <CssBaseline />

          <Header />
          {children}

      
          <ToastContainer limit={2} />
        </body>
      </Providers>
    </NextIntlClientProvider>

  );
}

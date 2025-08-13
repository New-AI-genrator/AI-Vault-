import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta property="og:url" content="https://yourdomain.com" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="AI Tools Directory" />
        <meta property="og:description" content="Discover and compare AI tools" />
        <meta property="og:image" content="https://yourdomain.com/og-image.jpg" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Tools Directory" />
        <meta name="twitter:description" content="Discover and compare AI tools" />
        <meta name="twitter:image" content="https://yourdomain.com/twitter-image.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

import type { AppProps } from 'next/app';
import { MockAuthProvider } from '../contexts/MockAuthContext';
import { ComparisonProvider } from '../contexts/ComparisonContext';
import Layout from '../components/Layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MockAuthProvider>
      <ComparisonProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ComparisonProvider>
    </MockAuthProvider>
  );
}

export default MyApp;

import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import { RecoilRoot } from 'recoil';
import '../styles/globals.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp

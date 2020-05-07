import React from 'react';
import './app.css';
import { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

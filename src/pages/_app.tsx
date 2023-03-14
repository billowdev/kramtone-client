import "../styles/globals.css";
import type { AppProps } from "next/app";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import * as React from "react";
import { ThemeProvider } from "@mui/material";
import { Toaster } from "react-hot-toast";
import { fetchSession } from "@/store/slices/auth.slice";
import Theme from '../components/Theme';

function MyApp({ Component, pageProps }: AppProps) {
  React.useEffect(() => {
    store.dispatch(fetchSession());
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={Theme}>
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;

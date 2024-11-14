import { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";
import React, { useEffect } from "react";
import { QueryClientProvider, QueryClient } from "react-query";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

import { LogoutOverlay } from "@molecules";
import { useSession } from "@store";
import { GlobalStyles } from "@styles/global";
import { theme } from "@styles/theme";

import "react-toastify/dist/ReactToastify.css";

const queryClient = new QueryClient();

const App = ({ Component, pageProps }: AppProps) => {
  const { restoreSession, isLoggingOut } = useSession();

  useEffect(() => {
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <NextNProgress />
        <ToastContainer />
        <GlobalStyles />
        <Component {...pageProps} />
        {isLoggingOut && <LogoutOverlay />}
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;


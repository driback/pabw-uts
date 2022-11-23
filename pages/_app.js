import { QueryClientProvider, QueryClient } from "react-query";
import { useRef } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const queryClient = useRef(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          refetchOnmount: false,
          refetchOnReconnect: false,
          retry: false,
          staleTime: 1000 * 60 * 60 * 24,
        },
      },
    })
  );
  return (
    <QueryClientProvider client={queryClient.current}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;

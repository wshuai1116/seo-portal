import { QueryClient } from "react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
      retry: (count, error) => {
        if (count >= 2) {
          return false;
        }

        const statusCode = (error as StdResponseErr).statusCode;
        const isClinetError = statusCode >= 400 && statusCode < 500;

        // skip retry for client error
        return !isClinetError;
      },
    },
  },
});

export default queryClient;

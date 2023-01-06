import {
  useMutation,
  useQuery,
  useQueryClient,
  QueryClient,
  UseQueryOptions,
} from "react-query";

import * as notification from "@/components/display/Notification";

export const createSimpleQueryHook = <Params = undefined, Result = undefined>(
  api: (options: Params) => Promise<{ result: Result }>,
  keyCreator: (options: Params extends undefined ? void : Params) => any,
  enabled?: (options: Params extends undefined ? void : Params) => boolean,
  queryOptions?: Pick<UseQueryOptions, "staleTime">
) => {
  type WrappedParams = Params extends undefined ? void : Params;

  const useSimpleQuery = (
    options: WrappedParams,
    handlers?: {
      onError?: (e: StdResponseErr) => void;
      onSuccess?: (data: Result, options: WrappedParams) => void;
    }
  ) => {
    return useQuery<Result, StdResponseErr, Result>(
      keyCreator(options),
      async () => {
        const rs = await api(options as Params);

        return rs.result;
      },
      {
        onSuccess(data) {
          handlers?.onSuccess?.(data, options);
        },
        onError(e) {
          handlers?.onError?.(e);
        },
        enabled: enabled ? enabled(options) : true,
        ...queryOptions,
      }
    );
  };

  return useSimpleQuery;
};

export const createSimpleMutationHook = <Params, Result = unknown>(
  api: (options: Params) => Promise<{
    result: Result;
  }>,
  onSettled?: (options: Params, client: QueryClient) => void,
  retry?: number
) => {
  const useSimpleMutation = (handlers?: {
    onSuccess?: (data: Result, options: Params) => void;
    onError?: (e: StdResponseErr, options: Params) => void;
  }) => {
    const queryClient = useQueryClient();

    return useMutation<Result, StdResponseErr, Params>(
      async (options) => {
        const rs = await api(options);
        return rs.result;
      },
      {
        onSuccess(data, options) {
          handlers?.onSuccess?.(data, options);
        },
        onSettled(_, __, options) {
          onSettled?.(options, queryClient);
        },
        onError(e, options) {
          if (handlers?.onError) {
            handlers.onError(e, options);
          } else {
            notification.error(e.message);
          }
        },
        retry,
      }
    );
  };

  return useSimpleMutation;
};

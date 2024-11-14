import { useRouter } from "next/router";

import { UseQueryState, SetQuery } from "./types";

export const useQueryState: UseQueryState = () => {
  const router = useRouter();

  const setQuery: SetQuery = (newQuery, options) => {
    const query = {
      ...(!options?.resetQueries && router.query),
      ...newQuery,
    };

    Object.keys(query).forEach((key) => {
      if (!query[key]) {
        delete query[key];
      }
    });

    router.replace(
      {
        pathname: router.pathname,
        query,
      },
      null,
      { shallow: true }
    );
  };

  const resetQueries = () => {
    router.replace(router.pathname, null, { shallow: true });
  };

  return {
    query: router.query,
    setQuery,
    resetQueries,
  };
};

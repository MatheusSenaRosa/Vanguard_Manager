export type SetQuery = (
  newQuery: { [key: string]: any },
  options?: { resetQueries: true }
) => void;

export type UseQueryState = () => {
  query: {
    [key: string]: any;
  };
  setQuery: SetQuery;
  resetQueries: () => void;
};

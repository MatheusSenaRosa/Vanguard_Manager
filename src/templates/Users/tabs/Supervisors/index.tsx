import { useMemo } from "react";
import { useQuery } from "react-query";

import { useQueryState } from "@hooks";
import { Column, FetchError, Table } from "@molecules";
import { useUsersServices } from "@services";

import * as S from "./styles";

export const Supervisors = () => {
  const { query } = useQueryState();

  const { listSupervisors } = useUsersServices();

  const {
    data,
    refetch,
    isLoading: isLoadingQuery,
    isRefetching,
    isError: isErrorQuery,
    isLoadingError,
    isRefetchError,
  } = useQuery(["supervisors_listing", query], () => listSupervisors(query), {
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: query?.tab === "Supervisores",
  });

  const columns = useMemo(
    (): Column<typeof data.managers>[] => [
      {
        header: "Avatar",
        width: 80,
        Cell: () => <S.Avatar />,
      },
      {
        header: "Nome",
        accessor: "name",
        align: "left",
        maxWidth: 300,
      },
      {
        header: "Email",
        align: "left",
        accessor: "email",
      },
      {
        header: "Ações",
        align: "right",
        Cell: () => <button>daoskjd</button>,
        width: 80,
      },
    ],
    [data]
  );

  const isError = isErrorQuery || isLoadingError || isRefetchError;

  const isLoading = isLoadingQuery || isRefetching;

  if (isError) {
    return <FetchError refetch={refetch} />;
  }

  return (
    <Table
      columns={columns}
      data={data?.managers}
      lastPage={data?.lastPage}
      isLoading={isLoading}
    />
  );
};

import { useMemo } from "react";
import { useQuery } from "react-query";

import { useQueryState } from "@hooks";
import { Column, FetchError, Table } from "@molecules";
import { useUsersServices } from "@services";

import * as S from "./styles";

export const Students = () => {
  const { query } = useQueryState();

  const { listCustomers } = useUsersServices();

  const {
    data,
    refetch,
    isLoading: isLoadingQuery,
    isRefetching,
    isError: isErrorQuery,
    isLoadingError,
    isRefetchError,
  } = useQuery(["customers_listing", query], () => listCustomers(query), {
    refetchOnWindowFocus: false,
    retry: 1,
    enabled: query?.tab === "Alunos" || !query?.tab,
  });

  const columns = useMemo(
    (): Column<typeof data.customers>[] => [
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
        header: "Status",
        width: 200,
        Cell: ({ row: { status } }) => (
          <S.Status type={status === "Ativo" ? "success" : "error"}>
            {status}
          </S.Status>
        ),
      },
      {
        header: "Assinatura",
        width: 200,
        Cell: () => (
          <S.Status type={"Ativa" === "Ativa" ? "success" : "error"}>
            Ativa
          </S.Status>
        ),
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
      data={data?.customers}
      lastPage={data?.lastPage}
      isLoading={isLoading}
    />
  );
};

import { CaretLeft, CaretRight } from "phosphor-react";
import { useMemo } from "react";

import { Button } from "@atoms";
import { useQueryState } from "@hooks";

import * as S from "./styles";
import { Column, GenericObject } from "./types";

type Props<T extends GenericObject[]> = {
  columns: Column<T>[];
  data: T;
  lastPage?: number;
  isLoading?: boolean;
};

export const Table = <T extends GenericObject[]>({
  columns,
  data,
  lastPage,
  isLoading,
}: Props<T>) => {
  const { query, setQuery } = useQueryState();

  const currentPage = Number(query?.page) || 1;

  const isPageInvalid = currentPage > lastPage;

  const pages = useMemo(() => {
    if (!lastPage || lastPage === 1) return null;

    const values = Array(lastPage >= 5 ? 5 : lastPage).fill(null);

    if (currentPage >= lastPage - 2 && lastPage >= 5) {
      const difference = lastPage - currentPage;

      return values.map((_, index) => currentPage + index - 4 + difference);
    }

    if (currentPage >= 3 && lastPage >= 5) {
      return values.map((_, index) => currentPage + index - 2);
    }

    return values.map((_, index) => index + 1);
  }, [lastPage, currentPage]);

  return (
    <>
      <S.Container>
        {Boolean(!data?.length && !isLoading && !isPageInvalid) && (
          <h3>Nenhum dado encontrado</h3>
        )}

        {isPageInvalid && <h3>Página inválida</h3>}

        <S.Table>
          {Boolean(!isLoading && data?.length) && (
            <thead>
              <S.HeadRow>
                {columns.map((column) => (
                  <S.HeadData
                    $width={column?.width}
                    $maxWidth={column?.maxWidth}
                    $minWidth={column?.minWidth}
                    align={column?.align || "center"}
                    key={column?.header || column?.id}
                  >
                    {column?.header}
                  </S.HeadData>
                ))}
              </S.HeadRow>
            </thead>
          )}

          <tbody>
            {isLoading &&
              Array(6)
                .fill(null)
                .map((_, index) => (
                  <S.RowSkeleton key={index}>
                    {columns.map((_, columnIndex) => (
                      <S.BodyData key={columnIndex} />
                    ))}
                  </S.RowSkeleton>
                ))}

            {Boolean(!isLoading && data?.length) &&
              data.map((row, rowIndex) => (
                <S.BodyRow key={rowIndex + 1}>
                  {columns.map((column) => {
                    const key = column?.header || column?.id;

                    if (column?.Cell) {
                      const { Cell } = column;

                      return (
                        <S.BodyData align={column?.align || "center"} key={key}>
                          <Cell row={row} />
                        </S.BodyData>
                      );
                    }

                    if (column?.accessor) {
                      return (
                        <S.BodyData align={column?.align || "center"} key={key}>
                          {row[column.accessor]}
                        </S.BodyData>
                      );
                    }

                    return null;
                  })}
                </S.BodyRow>
              ))}
          </tbody>
        </S.Table>
      </S.Container>

      {!isLoading && lastPage && lastPage !== 1 && (
        <S.PaginationWrapper>
          <Button
            type="button"
            $buttonTheme="neutral"
            disabled={currentPage === 1}
            onClick={() => setQuery({ page: currentPage - 1 })}
          >
            <CaretLeft />
          </Button>

          {pages.map((page) => {
            return (
              <S.PaginationButton
                $buttonTheme="neutral"
                disabled={currentPage === page}
                type="button"
                key={page}
                onClick={() => setQuery({ page })}
              >
                {page}
              </S.PaginationButton>
            );
          })}

          <Button
            type="button"
            $buttonTheme="neutral"
            disabled={currentPage === lastPage}
            onClick={() => setQuery({ page: currentPage + 1 })}
          >
            <CaretRight />
          </Button>
        </S.PaginationWrapper>
      )}
    </>
  );
};

import { Spinner } from "@atoms";

import * as S from "../../styles";

export const PageSkeleton = () => {
  return (
    <S.Container>
      <S.Content>
        <h2>Entrar</h2>

        <S.Form>
          <S.FormRow>
            <S.Skeleton width={90} height={20} />
            <S.Skeleton />
          </S.FormRow>

          <S.FormRow>
            <S.Skeleton width={90} height={20} />
            <S.Skeleton />
          </S.FormRow>

          <S.Skeleton height={54}>
            <Spinner />
          </S.Skeleton>

          <S.Skeleton height={24} width={158} $isCenter />
        </S.Form>
      </S.Content>
    </S.Container>
  );
};


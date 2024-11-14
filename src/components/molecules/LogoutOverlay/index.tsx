import { Portal, Spinner } from "@atoms";

import * as S from "./styles";

export const LogoutOverlay = () => {
  return (
    <Portal>
      <S.Container>
        <Spinner size={50} />
      </S.Container>
    </Portal>
  );
};


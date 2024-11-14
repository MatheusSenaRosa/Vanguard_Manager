import { Modal } from "./components";
import { ForgotPasswordProvider, useForgotPasswordContext } from "./context";
import { FirstStep, SecondStep } from "./steps";
import * as S from "./styles";

const ForgotPasswordElement = () => {
  const { currentStep, modal, email, onCloseModal } = useForgotPasswordContext();

  return (
    <>
      <S.Main>
        <S.Content>
          {currentStep === 1 && <FirstStep />}

          {currentStep === 2 && <SecondStep />}
        </S.Content>
      </S.Main>

      <Modal isOpen={modal.isOpen} email={email} onClose={onCloseModal} />
    </>
  );
};

export const ForgotPasswordTemplate = () => (
  <ForgotPasswordProvider>
    <ForgotPasswordElement />
  </ForgotPasswordProvider>
);

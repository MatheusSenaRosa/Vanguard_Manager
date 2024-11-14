import styled, { css } from "styled-components";

export const Container = styled.section<{ $hasClearButton: boolean }>`
  ${({ theme, $hasClearButton }) => css`
    display: flex;
    align-items: center;
    gap: 10px;

    color: white;
    font-size: 16px;
    font-weight: 600;

    ${$hasClearButton &&
    css`
      button:last-child {
        border-radius: 5px;
        padding: 10px 20px;

        font-size: 16px;
        font-weight: 600;

        transition: 0.3s;
        cursor: pointer;

        border: none;
        background-color: ${theme.colors.feedback.error};
        color: ${theme.colors.neutral[80]};
      }
    `}
  `}
`;

export const FilterTag = styled.button<{ $isActive: boolean }>`
  ${({ theme, $isActive }) => css`
    border: none;
    background-color: ${theme.colors.neutral[40]};

    padding: 10px 20px;
    border-radius: 5px;

    font-size: 16px;
    font-weight: 600;
    color: ${theme.colors.neutral[0]};

    transition: 0.3s;
    cursor: pointer;

    ${$isActive &&
    css`
      color: ${theme.colors.feedback.success};
    `}

    &:hover {
      background-color: ${theme.colors.neutral[60]};
    }
  `}
`;

export const ModalWrapper = styled.div`
  ${({ theme }) => css`
    width: 400px;

    header {
      background-color: ${theme.colors.neutral[70]};

      padding: 10px 15px;

      display: flex;
      align-items: center;
      justify-content: space-between;

      color: ${theme.colors.neutral[0]};
      font-size: 20px;
      font-weight: 600;

      border-radius: 10px 10px 0 0;

      button {
        cursor: pointer;
        border: none;
        background-color: transparent;

        display: flex;

        font-size: 25px;
        color: ${theme.colors.neutral[0]};
      }
    }
  `}
`;

export const ModalContent = styled.div`
  ${({ theme }) => css`
    background-color: ${theme.colors.neutral[60]};

    padding: 15px 15px;
    padding-bottom: 0;

    h3 {
      color: ${theme.colors.neutral[0]};
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    ul {
      display: flex;
      flex-direction: column;

      gap: 10px;

      li label {
        display: flex;
        align-items: center;
        gap: 10px;

        color: ${theme.colors.neutral[0]};

        font-size: 20px;

        cursor: pointer;

        width: fit-content;

        user-select: none;

        input {
          height: 18px;
          width: 18px;

          cursor: pointer;
        }
      }
    }
  `}
`;

export const ModalFooter = styled.footer`
  ${({ theme }) => css`
    background-color: ${theme.colors.neutral[60]};
    border-radius: 0 0 10px 10px;

    padding: 15px;

    display: flex;
    justify-content: flex-end;
    gap: 10px;

    button {
      padding: 0 20px;
    }
  `}
`;
